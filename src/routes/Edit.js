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

const Title = styled.h1`
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
    const [gorender, setGoRender] = useState(false)
    const [onChangeValue, setonChangeValue] = useState('')
    const { register, handleSubmit } = useForm() //useForm react-hook 사용
    const reviewvalue = useRecoilValue(reviewdataAtom) 
    const [bookdata, setBookData] = useRecoilState(bookdataAtom)
    const [writedata, setWriteData] = useRecoilState(writedataAtom)

    const reviewbid = reviewvalue[0].bookId

    useEffect(async()=>{
        if (reviewbid.indexOf(' ') !== -1){ //isbn10과 isbn13이 동시에 주어진 경우
        const isbn10 = reviewbid.slice(0,10)
        const isbn13 = reviewbid.slice(11)
        await booksdata(isbn10, isbn13)
    } else {
        await booksdata(reviewbid)
    }
    setGoRender(true)
    },[])

    useEffect(()=>{
        if (change){
        axios.put("http://127.0.0.1:8000/review/edit/", { //put 보내는 url 확인
        uid : sessionStorage.getItem('uid'),
        bid : datas.isbn, // bid string 으로 받는 거 확인
        rid : reviewvalue[0].reviewId,  //reviewId 추가
        rtitle : writedata[0].writeTitle,
        rtext: writedata[0].writeTxt,
        rate
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
    setBookData(()=> [{'bookTitle': documents[0].title, 'bookAuthors': documents[0].authors}])
    setDatas(documents[0])
    } 

    const onChange = (e) => {
        setRate(e.target.value)
    }
     
    const changeValue = (e) => {
        setonChangeValue(e.target.value)
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
            <Inputbox  placeholder='책 제목' required onChange={changeValue} value={ gorender ? bookdata[0].bookTitle : null}></Inputbox>
            <Inputbox  placeholder='지은이' required onChange={changeValue} value={ gorender ? bookdata[0].bookAuthors : null}></Inputbox>
            <Rate as="div" onChange={onChange}>
                <Ratebox type="radio" name="rate" value={1} defaultChecked={reviewvalue[0].reviewRate===1 ? true : false}/>★  
                <Ratebox type="radio" name="rate" value={2} defaultChecked={reviewvalue[0].reviewRate===2 ? true : false}/>★★   
                <Ratebox type="radio" name="rate" value={3} defaultChecked={reviewvalue[0].reviewRate===3 ? true : false}/>★★★ 
                <Ratebox type="radio" name="rate" value={4} defaultChecked={reviewvalue[0].reviewRate===4 ? true : false}/>★★★★    
                <Ratebox type="radio" name="rate" value={5} defaultChecked={reviewvalue[0].reviewRate===5 ? true : false}/>★★★★★  
            </Rate>
            <Textbox  {...register("rtext", {required: "input your text", maxLength: 1000})} defaultValue={reviewvalue[0].reviewTxt}></Textbox>
            <Subm  onClick={handleSubmit(writeSubmit)}>수정</Subm>
        </Writeform>
    </Body> 
    </>
    )}

export default withRouter(Edit)