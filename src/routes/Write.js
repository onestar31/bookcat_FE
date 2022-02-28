import React, { useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Nickname from 'components/Nickname'
import { useForm } from 'react-hook-form'
import { bookdataAtom } from 'components/Atom'
import { writedataAtom } from 'components/Atom'
import { useRecoilState } from 'recoil'

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

const Write = ({history}) => {
    
    const [bookdata, setBookData] = useRecoilState(bookdataAtom)
    const [writedata, setWriteData] = useRecoilState(writedataAtom)

    const booktitle = (history.location.pathname === '/write') ? '' : bookdata[0].bookTitle //삼항 연산자 사용하여 홈페이지에 따른 정보 뷰 상태 변환
    const bookauthor = (history.location.pathname === '/write') ? '' : bookdata[0].bookAuthors //삼항 연산자 사용하여 홈페이지에 따른 정보 뷰 상태 변환

    //const rtitle = writedata.writeTitle

    const [change, setChange] = useState(false)
    const [rate, setRate] = useState(0)
    const { register, handleSubmit } = useForm() //useForm react-hook 사용 //new 주석

    //writeSubmit가 구동된 후 change 상태가 변화할 때 시행되는 장고로 데이터 post 하는 코드
    useEffect(()=> {
        if (change){
        axios.post("http://127.0.0.1:8000/review/", {
            uid : sessionStorage.getItem('uid'),
            bid : bookdata[0].isbn,
            rtitle : writedata[0].writeTitle,
            date : day, //주석
            rtext: writedata[0].writeTxt,
            rate: +rate
        }).then(function(response) {
            console.log(response)
            alert(response.data.message)
        }).catch(function(error) {
            console.log(error)
            alert('문제가 발생했습니다.')
        }).finally(() => {
           history.push('/review')
        })}
    },[change])

    //onSubmit를 한 경우 시행되는 코드 
    const writeSubmit = async (data) => {
        setWriteData(()=> [{'writeTitle': data.rtitle, 'writeTxt': data.rtext}])
        if (history.location.pathname === '/write'){
        setBookData(()=> [{'bookTitle': data.btitle, 'bookAuthors': data.bauthor}])
        }
        setChange(true)
    }

    //서평 작성 날짜 
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()
    const day = year+'.'+month+'.'+(date+1)+'.'

   /*  //rate ★
    let star = ''
    let starlist = []
    for (let i=0; i<5; i++){
        star += '★'
        starlist.push(star)
    } */
     
    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
        <Body>
        <Title>글쓰기</Title>
        <Writeform onSubmit={handleSubmit(writeSubmit)}>
            <Inputbox  placeholder='제목' {...register("rtitle", {required: "input your title", maxLength: 30})}></Inputbox>
            <Inputbox  placeholder='책 제목' {...register("btitle", {required: "input book title"})} defaultValue={booktitle}></Inputbox>
            <Inputbox  placeholder='지은이' {...register("bauthor", {required: "input author"})} defaultValue={bookauthor}></Inputbox>
            <Rate as="div">
            <Ratebox  type="radio" name="rate" value="1" onClick={(e)=> setRate(e.target.value)} />★
            <Ratebox  type="radio" name="rate" value="2" onClick={(e)=> setRate(e.target.value)}/>★★
            <Ratebox  type="radio" name="rate" value="3" onClick={(e)=> setRate(e.target.value)}/>★★★
            <Ratebox  type="radio" name="rate" value="4" onClick={(e)=> setRate(e.target.value)}/>★★★★
            <Ratebox  type="radio" name="rate" value="5" onClick={(e)=> setRate(e.target.value)}/>★★★★★
            </Rate>
            <Textbox  {...register("rtext", {required: "input your text", maxLength: 1000})}></Textbox>
            <Subm  onClick={handleSubmit(writeSubmit)}>등록</Subm>
        </Writeform>
    </Body> 
    </>
    )}

export default withRouter(Write)