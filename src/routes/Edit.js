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

const Edit = ({history}) => {
    const [bookdata, setBookData] = useState('')
    const [change, setChange] = useState(false)
    const { register, watch, handleSubmit, formState, setError, setValue } = useForm() //useForm react-hook 사용
    const reviewvalue = useRecoilValue(reviewdataAtom) 
    const bookvalue = useRecoilValue(bookdataAtom)
    const [writedata, setWriteData] = useRecoilState(writedataAtom)

    useEffect(()=>{
        booksdata(reviewvalue[0].isbn)
    },[])

    useEffect(()=>{
        if (change){
        axios.post("http://127.0.0.1:8000/review/edit/", {
        uid : sessionStorage.getItem('uid'),
        bid : bookdata.isbn, 
        rtitle : writedata[0].writeTitle,
        date : reviewvalue[0].reviewDate, //날짜는 예전 꺼 그대로
        rtext: writedata[0].writeTxt,
        /* rate :  미완입니다*/ 
        //rid //review id 대신에 bid로 할 수 있을까 -> 장고 DB에서 rid를 PK로 하기 때문에 rid 사용해야 함
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
    async function booksdata(word) {
        const params = {
            target: 'isbn',
            query: word,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents); 
    setBookData(documents[0])
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
            <Inputbox  placeholder='책 제목' {...register("btitle", {required: "input book title"})} defaultValue={bookdata?.title}></Inputbox>
            <Inputbox  placeholder='지은이' {...register("bauthor", {required: "input author"})} defaultValue={bookdata?.authors}></Inputbox>
            <Textbox  {...register("rtext", {required: "input your text", maxLength: 1000})} defaultValue={reviewvalue[0].reviewTxt}></Textbox>
            <Subm  onClick={handleSubmit(writeSubmit)}>수정</Subm>
        </Writeform>
    </Body> 
    </>
    )}

export default withRouter(Edit)