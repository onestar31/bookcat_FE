import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Nickname from '../components/Nickname'

const Title = styled.h1`
font-family: 'OTWelcomeRA';
text-align: center;
font-weight: 500;
font-size: 23px;
padding-top: 2rem;
width: 100vw;

`
const Footprint1 = styled.img`
width: 50px;
height: 50px;
position: absolute;
left: 350px;
`
const Footprint2 = styled.img`
width: 50px;
height: 50px;
position: absolute;
right: 400px;
bottom: 100px;
`
const Loginform = styled.form`
font-family: 'OTWelcomeRA';
background-color: #E8A5A5;
width: 410px;
height: 460px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;`

const Email = styled.input`
margin: 100px 0 0 24px;
width: 340px;
font-size: 16px;
color: white;
background: transparent;
border: none;
border-bottom: solid #FFFFFF 1px;
:focus{outline: none};
::placeholder{color: white;font-size: 14px;}
`
const Password = styled.input`
margin: 40px 0 0 24px;
width: 340px;
font-size: 16px;
color: white;
background : transparent;
border: none;
border-bottom: solid #FFFFFF 1px;
:focus{outline: none};
::placeholder{color: white; font-size: 14px}
`
const Loginbtn = styled.button`
text-align: center;
border-radius: 30px;
border: none;
color: #D15C5C;
width: 200px;
height: 45px;
margin-left: 50%;
margin-top: 122px;
margin-bottom: 48px;
transform: translateX(-50%);
`
const Asksignup = styled.span`
font-size: 14px;
color: white;
position: relative;
margin-left: 15%;

`
const Signupbtn = styled.span`
font-size: 14px;
color: white;
margin-left: 14%;
`
const Slink = styled(Link)`
text-decoration: none;
color: white;
`

const Login = ({ history }) => {
    const [emailState, setEmail] = useState('')
    const [passwordState, setPassword] = useState('')

    const onChange = (e) => {
        const { target: { value, name } } = e
        if (name === 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }

    const loginPost = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/user/login", {
            userEmail: emailState,
            userPw: passwordState,
        }).then(function (response) {
            console.log(response.data)
            alert(response.data.message)
            storeLoginData(response)
        }).catch(function (error) {
            console.log(error.response)
            alert(error.response.data.message)
        }).finally(
            toHome()
        )
    }

    const storeLoginData = (response) => {
        sessionStorage.setItem('nickname', response.data.userName)
        sessionStorage.setItem('email', response.data.userEmail)
        sessionStorage.setItem('uid', response.data.uid)
    }

    const toHome = () => {
        history.push('/')
    }

    return (
        <>
            <Nickname />
            <Top />
            <Navigation />
            <Title>로그인</Title>
            {/*<Footprint1 src="footprint.png"></Footprint1>*/}
            <Loginform onSubmit={loginPost}>
                <Email type="email" required placeholder='이메일' name='email' value={emailState} onChange={onChange}></Email><br />
                <Password type="password" required placeholder='비밀번호' name='password' value={passwordState} onChange={onChange}></Password><br />
                <Loginbtn>로그인</Loginbtn><br />
                <Asksignup>아직 회원이 아니신가요?</Asksignup>
                <Signupbtn><Slink to="/signup">회원가입 하기</Slink></Signupbtn>
            </Loginform>
            {/*<Footprint2 src={process.env.PUBLIC_URL+`footprint.png`}></Footprint2>*/}
        </>
    )
}

export default withRouter(Login)