import React, { useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { ResultApi } from '../ResultApi'
import axios from 'axios'
import Nickname from 'components/Nickname'
import { useForm } from 'react-hook-form'

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

const Write = ({history}) => {
    const booktitle = (history.location.pathname === '/write') ? '' : window.sessionStorage.getItem('booktitle') //삼항 연산자 사용하여 홈페이지에 따른 정보 뷰 상태 변환
    const bookauthor = (history.location.pathname === '/write') ? '' : window.sessionStorage.getItem('bookauthors') //삼항 연산자 사용하여 홈페이지에 따른 정보 뷰 상태 변환
    const [datas, setDatas] = useState('')
    const [writeData, setWriteData] = useState('')
    const { register, watch, handleSubmit, formState, setError, setValue } = useForm() //useForm react-hook 사용

    //datas 상태가 변할 때 시행되는 장고로 데이터 post 하는 코드
        useEffect(()=> {
            if (datas !== '') {
            axios.post("http://127.0.0.1:8000/review/", {
                bid : datas.isbn,
                rtitle : writeData.rtitle,
                date : day,
                rtext: writeData.rtext,
                uid : sessionStorage.getItem('email'),
                //rid //review id 대신에 bid로 할 수 있을까 
            }).then(function(response) {
                console.log(response)
                alert(response.data.message)
            }).catch(function(error) {
                console.log(error)
                alert('문제가 발생했습니다.')
            }).finally(() => {
               history.push('/review')
            })}
        },[datas])

        //onSubmit를 한 경우 시행되는 코드 
    const writeSubmit = async (data) => {
        try{
        setWriteData(data)
        window.sessionStorage.setItem('rtitle', (data.rtitle)) //서평 작성 정보 sessionStorage에 저장
        window.sessionStorage.setItem('bauthor', (data.bauthor)) //rauthor를 bauthor로 바꿈
        window.sessionStorage.setItem('btitle', (data.btitle))
        window.sessionStorage.setItem('rtext', (data.rtext))
        window.sessionStorage.setItem('day', day)
        await booksdata(data.btitle, data.bauthor)
        } catch {
            console.log('somethis is wrong')
        } 
    }

    //서평 작성 날짜 
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()
    const rid = today.getTime()
    const day = year+'.'+month+'.'+(date+1)+'.'

    //서평 책 정보 카카오 api로 불러오기 함수
    async function booksdata(btitle, bauthor) {
        const params = {
            target: 'title' & 'person',
            query: btitle, bauthor,
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
            <Inputbox  placeholder='제목' {...register("rtitle", {required: "input your title", maxLength: 30})}></Inputbox>
            <Inputbox  placeholder='책 제목' {...register("btitle", {required: "input book title"})} defaultValue={booktitle}></Inputbox>
            <Inputbox  placeholder='지은이' {...register("bauthor", {required: "input author"})} defaultValue={bookauthor}></Inputbox>
            <Textbox  {...register("rtext", {required: "input your text", maxLength: 1000})}></Textbox>
            <Subm  onClick={handleSubmit(writeSubmit)}>등록</Subm>
        </Writeform>
    </Body> 
    </>
    )}

export default withRouter(Write)