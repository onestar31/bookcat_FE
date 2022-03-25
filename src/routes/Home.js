import React, { useState } from 'react'
import styled from 'styled-components'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import { withRouter } from 'react-router-dom'
import Nickname from '../components/Nickname'
import { Helmet, HelmetProvider } from "react-helmet-async";

const Body = styled.div`
position: relative;
font-family: 'YanoljaYacheR';
display: flex;
`

const Bodypic = styled.div`
display: flex;
width: 950px;
height: 74vh;
opacity: 55%;
margin: 0 auto;
background-image : url('https://raw.githubusercontent.com/onestar31/bookcat_FE/master/src/mainbookshelf.jpeg');
@media screen and (max-width: 500px) {
       
    }
`

const Keyform = styled.div`
display: flex;
flex-direction: column;
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
align-items: center;
vertical-align: middle;
`
const Form = styled.form``

const Keytitle = styled.h1`
font-size: 32px;
color: #D15C5C;
margin: 23px 0 ;
`
const Description = styled.div`
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


const Home = ({ history }) => {
    const [keyvalue, setKeyValue] = useState('')

    const submitKeyword = (e) => {
        e.preventDefault()
        if (keyvalue === '') {
            alert('키워드를 입력해주세요')
        } else {
            window.sessionStorage.setItem('keyword', keyvalue)
            history.push('/searchresult')
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
                    <title>고양이와 책을 서평 작성 웹 사이트</title>
                    <meta name="description" content="'고양이와 책을'은 읽은 책에 대한 서평을 쓰고 개인 공간에 저장할 수 있는 서평 작성 사이트 입니다."></meta>
                </Helmet>
            </HelmetProvider>
            <Nickname />
            <Top />
            <Navigation />
            <Body>
                <Bodypic></Bodypic>
                <Keyform>
                    <Keytitle>키워드를 입력하세요</Keytitle>
                    <Description>고양이와 책을에서 키워드에 맞는 책을 읽고<br /> 나만의 서평을 작성해보세요</Description>
                    <Form onSubmit={submitKeyword}>
                        <div><Keyinput type="text" value={keyvalue} onChange={(e) => setKeyValue(e.target.value)}></Keyinput></div>
                        <Search onSubmit={submitKeyword}>검색</Search>
                    </Form>
                </Keyform>
            </Body>
        </>
    )
}

export default withRouter(Home)