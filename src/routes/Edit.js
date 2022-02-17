import React, { useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { ResultApi } from '../ResultApi'
import axios from 'axios'
import Nickname from 'components/Nickname'
import { useForm } from 'react-hook-form'
import { reviewdataAtom, bookdataAtom, writedataAtom } from 'components/Atom'
import { useRecoilValue, useRecoilState } from 'recoil'

//서평쓰기 폼 구현

const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;`

const Title = styled.div`
width: 8rem;
font-size: 28px;
margin-top: 2.2rem;
margin-left: 50%;
transform: translateX(-50%);
text-align: center;
align-content: center;
border-bottom: 2px black solid;
padding-bottom: 4px;
`

const Writeform = styled.form`
margin-left: 50%;
transform: translateX(-50%);
margin-top: 3.7rem;
height: 25rem;
width: 50rem;
font-size: 12px;
`

const Inputbox = styled.input`
border: none;
border-top: 2px solid #828282;
height: 2rem;
width: 100%;
:focus {outline:none;};
font-size: 15px;
padding-left: 7px;
`

const Tit = styled.div``

const Info = styled.div``

const Textbox = styled.textarea`
border: 2px solid #828282;
height: 18rem;
width: 100%;
:focus {outline:none;};
resize: none;
font-size: 13px;
padding-left: 7px;
padding-top: 7px;
`

const Starrate = styled(Inputbox)``

const Subm = styled.button`
margin-left: 100%;
transform: translateX(-100%);
margin-top: 1rem;
width: 7.5rem;
height: 2.3rem;
background: #E8A5A5;
border: none;
outline: none;
font-family: 'YanoljaYacheR' !important;
font-size: 17px;`

const Ratebox = styled.input`
margin-top: 0.5rem;`

const Rate = styled(Inputbox)`
text-align: start;`

const Edit = ({history}) => {
    const [datas, setDatas] = useState('')
    const [rate, setRate] = useState(0)
    const [change, setChange] = useState(false)
    const { register, watch, handleSubmit, formState, setError, setValue } = useForm() //useForm react-hook 사용
    const reviewvalue = useRecoilValue(reviewdataAtom) 
    const [bookdata, setBookData] = useRecoilState(bookdataAtom)
    const [writedata, setWriteData] = useRecoilState(writedataAtom)

    const reviewbid = reviewvalue[0].bookId

    useEffect(()=>{
        if (reviewbid.indexOf(' ') !== -1){ //isbn10과 isbn13이 동시에 주어진 경우
        const isbn10 = reviewbid.slice(0,10)
        const isbn13 = reviewbid.slice(11)
        booksdata(isbn10, isbn13)
    } else {
        booksdata(reviewbid)
    }
    },[])

    useEffect(()=>{
        if (change){
        axios.post("http://127.0.0.1:8000/review/edit/", { //post 보내는 url 확인
        uid : sessionStorage.getItem('uid'),
        bid : datas.isbn, // bid string 으로 받는 거 확인
        rid : reviewvalue[0].reviewId,  //reviewId 추가
        rtitle : writedata[0].writeTitle,
        rtext: writedata[0].writeTxt,
        rate : +rate 
    }).then(function(response) {
        console.log(response)
        alert(response.data.message)
    }).catch(function(error) {
        console.log(error)
        alert('문제가 발생했습니다.')
    }).finally(() => {
        history.push('/review')
    })}
    }, [change])

        //onSubmit를 한 경우 시행되는 코드 
    const writeSubmit = (data) => {
        setWriteData(()=> [{'writeTitle': data.rtitle, 'writeTxt': data.rtext}])
        setBookData(()=> [{'bookTitle': data.btitle, 'bookAuthors': data.bauthor}])
        setChange(true)
        }

    //서평 책 정보 카카오 api로 불러오기 함수
    async function booksdata(isbn10, isbn13) {
        const params = {
            target: 'isbn',
            query: isbn10 || isbn13,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents); 
    setDatas(documents[0])
    } 
     
    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
        <Body>
        <Title>글쓰기</Title>
        <Writeform onSubmit={handleSubmit(writeSubmit)}>
            <Inputbox  placeholder='제목' {...register("rtitle", {required: "input your title", maxLength: 30})} defaultValue={reviewvalue[0].reviewTitle}></Inputbox>
            <Inputbox  placeholder='책 제목' {...register("btitle", {required: "input book title"})} defaultValue={datas?.title}></Inputbox>
            <Inputbox  placeholder='지은이' {...register("bauthor", {required: "input author"})} defaultValue={datas?.authors}></Inputbox> {/* //세번 눌러야하는 문제  */}
            <Rate as="div">
            <Ratebox  type="radio" name="rate" value="1" onClick={(e)=> setRate(e.target.value)} />★
            <Ratebox  type="radio" name="rate" value="2" onClick={(e)=> setRate(e.target.value)}/>★★
            <Ratebox  type="radio" name="rate" value="3" onClick={(e)=> setRate(e.target.value)}/>★★★
            <Ratebox  type="radio" name="rate" value="4" onClick={(e)=> setRate(e.target.value)}/>★★★★
            <Ratebox  type="radio" name="rate" value="5" onClick={(e)=> setRate(e.target.value)}/>★★★★★
            </Rate>
            <Textbox  {...register("rtext", {required: "input your text", maxLength: 1000})} defaultValue={reviewvalue[0].reviewTxt}></Textbox>
            <Subm  onClick={handleSubmit(writeSubmit)}>수정</Subm>
        </Writeform>
    </Body> 
    </>
    )}

export default withRouter(Edit)