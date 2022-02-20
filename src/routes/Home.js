import { getByTitle } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import { ResultApi } from '../ResultApi'
import {withRouter} from 'react-router-dom'
import Nickname from 'components/Nickname'


//메인 검색 화면 및 검색 결과 화면 구현

const Body = styled.div`
position: relative;
font-family: 'YanoljaYacheR';
`

const Bodypic = styled.img`
position: absolute;
width: 68vw;
height: 74vh;
opacity: 55%;
margin-left: 50%;
transform: translateX(-50%);`

const Keyform = styled.div`
position: absolute;
background-color: #F5E5E5;
opacity: 93%;
width: 400px;
height: 240px;
border-radius: 20px;
margin-left: 50%;
transform: translateX(-50%);
top: 160px;
text-align: center;
`
const Form = styled.form``
const Keytit = styled.div`
font-size: 32px;
color: #D15C5C;
margin: 23px 0 ;
`
const Keyexp = styled.div`
margin-bottom: 20px;
font-size: 18px;
`
const Keyinput = styled.input`
margin-bottom: 20px;
height: 24px;
`

const Search = styled.button`
background-color: #CB6C6C;
border-radius: 30px;
border: none;
color: white;
width: 110px;
height: 35px;`


const Home = ({history}) => {
    const [keyvalue, setKeyValue] = useState('')

    const keyvaluefunc = (e) => {setKeyValue(e.target.value);}

    const putKeyWord = (e) => {
        e.preventDefault()
        if (keyvalue === ''){
            alert('키워드를 입력해주세요')
        } else {
        window.sessionStorage.setItem('keyword', keyvalue)
        history.push('/searchresult')
    }} 
    
    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
    <Body>
    <Bodypic src={`${process.env.PUBLIC_URL}/mainbookself.jpeg`}></Bodypic>
    <Keyform>
        <Keytit>키워드를 입력하세요</Keytit>
        <Keyexp>고양이와 책을에서 키워드에 맞는 책을 읽고<br/> 나만의 서평을 작성해보세요</Keyexp>
        <Form onSubmit={putKeyWord}>
        <div><Keyinput type="text" value={keyvalue} onChange={keyvaluefunc}></Keyinput></div>
        <Search onSubmit={putKeyWord}>검색</Search>
        </Form>
        </Keyform>
    </Body>
    </>
    )}

export default withRouter(Home)