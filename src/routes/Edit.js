import React, { useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { ResultApi } from '../utils/KakaoApi'
import axios from 'axios'
import Nickname from '../components/Nickname'
import { useForm } from 'react-hook-form'
import { reviewdataAtom, bookdataAtom, writedataAtom } from '../utils/Atom'
import { useRecoilValue, useRecoilState } from 'recoil'

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
max-width: 50rem;
min-width: 400px;
font-size: 12px;
@media screen and (max-width: 700px) {
    }
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
    const { register, handleSubmit } = useForm()
    const reviewvalue = useRecoilValue(reviewdataAtom) 
    const [bookdata, setBookData] = useRecoilState(bookdataAtom)
    const [writedata, setWriteData] = useRecoilState(writedataAtom)
    const reviewbid = reviewvalue[0].bookId

    useEffect(()=>{
        if (reviewbid.indexOf(' ') !== -1){ 
        const isbn10 = reviewbid.slice(0,10)
        const isbn13 = reviewbid.slice(11)
        booksdata(isbn10, isbn13)
    } else {
        booksdata(reviewbid)
    }
    setGoRender(true)
    },[])

    useEffect(()=>{
        if (change){
        editPut()
    }}, [change])

    const editPut = () => {
        axios.put("http://0.0.0.0:8000/review/edit/", {
            uid : sessionStorage.getItem('uid'),
            bid : datas.isbn, 
            rid : reviewvalue[0].reviewId, 
            rtitle : writedata[0].writeTitle,
            rtext: writedata[0].writeTxt,
            rate : rate === 0 ? reviewvalue[0].reviewRate : rate,
        }).then(function(response) {
            console.log(response)
            alert(response.data.message)
            toReview()
        }).catch(function(error) {
            console.log(error)
            alert('문제가 발생했습니다.')
        })
    }

    const toReview = () => {
        history.push('/review')
    }

    const writeSubmit = (data) => {
        setWriteData(()=> [{'writeTitle': data.rtitle, 'writeTxt': data.rtext}])
        setChange(true)
    }

    async function booksdata(isbn10, isbn13) {
        const params = {
            target: 'isbn',
            query: isbn10 || isbn13,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); 
    setBookData(()=> [{'bookTitle': documents[0].title, 'bookAuthors': documents[0].authors}])
    setDatas(documents[0])
    } 

    const limitTextLength = (e) => {
        if (e.target.value.length > 1000) {
            alert('제한 글자수 초과입니다.')
        }
    }

    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
        <Body>
        <Title>글쓰기</Title>
        <Writeform onSubmit={handleSubmit(writeSubmit)}>
            <Inputbox  placeholder='제목' {...register("rtitle", {required: "input your title", maxLength: 30})} maxLength='30' defaultValue={reviewvalue[0].reviewTitle}></Inputbox>
            <Inputbox  placeholder='책 제목' required onChange={(e) => setonChangeValue(e.target.value)} value={ gorender ? bookdata[0].bookTitle : ''}></Inputbox>
            <Inputbox  placeholder='지은이' required onChange={(e) => setonChangeValue(e.target.value)} value={ gorender ? bookdata[0].bookAuthors : ''}></Inputbox>
            <Rate as="div" onChange={(e) => setRate(e.target.value)}>
                <Ratebox type="radio" name="rate" value={1} defaultChecked={reviewvalue[0].reviewRate===1 ? true : false}/>★  
                <Ratebox type="radio" name="rate" value={2} defaultChecked={reviewvalue[0].reviewRate===2 ? true : false}/>★★   
                <Ratebox type="radio" name="rate" value={3} defaultChecked={reviewvalue[0].reviewRate===3 ? true : false}/>★★★ 
                <Ratebox type="radio" name="rate" value={4} defaultChecked={reviewvalue[0].reviewRate===4 ? true : false}/>★★★★    
                <Ratebox type="radio" name="rate" value={5} defaultChecked={reviewvalue[0].reviewRate===5 ? true : false}/>★★★★★  
            </Rate>
            <Textbox  {...register("rtext", {required: "input your text", maxLength: 1000})} defaultValue={reviewvalue[0].reviewTxt} onChange={limitTextLength}></Textbox>
            <Subm  onClick={handleSubmit(writeSubmit)}>수정</Subm>
        </Writeform>
    </Body> 
    </>
    )}

export default withRouter(Edit)