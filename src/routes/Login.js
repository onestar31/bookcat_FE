import React, {useState} from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Nickname from 'components/Nickname'

//로그인 구현

const Logintit = styled.div`
font-family: 'OTWelcomeRA';
text-align: center;
font-weight: 500;
font-size: 23px;
padding-top: 20px;

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

const Login = ({history}) => {
    const [emailState, setEmail] = useState('')
    const [passwordState, setPassword] = useState('')
    const [loginState, setLogin] = useState(false)

    const onChange = (e) => {
        const {target: {value, name}} = e
        if (name === 'email'){
            setEmail(value)
        } else {
            setPassword(value)
        }
    }
    //submit시 서버로 axios 요청하여 login
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/user/login", {
            userEmail : emailState,
            userPw : passwordState,
        }).then(function(response){
            console.log(response)
            alert(response.data.message)
            sessionStorage.setItem('nickname', emailState) //닉네임 받아오면 emailState 대신 nickname 넣기
            sessionStorage.setItem('email', emailState)
            sessionStorage.setItem('id', emailState) //비밀번호 바꾸기 위한 axios put 요청을 해당 id 주소로 보낼 때 필요
            sessionStorage.setItem('pw', emailState) //비밀번호 바꾸기 위해 current pw를 확인하기 위해 필요 

            window.location.replace('/')
        }).catch(function(error){
            console.log(error.response)
            alert(error.response.data.message)
        })
    }
    return(
        <>
    <Nickname />
    <Top />
    <Navigation />
    <Logintit>로그인</Logintit>
    <Footprint1 src="footprint.png"></Footprint1>
    <Loginform onSubmit={onSubmit}>
        <Email type="email" required placeholder='이메일' name='email' value={emailState} onChange={onChange}></Email><br/>
        <Password type="password" required placeholder='비밀번호' name='password' value={passwordState} onChange={onChange}></Password><br/>
        <Loginbtn>로그인</Loginbtn><br/>
        <Asksignup>아직 회원이 아니신가요?</Asksignup>
        <Signupbtn><Slink to="/signup">회원가입 하기</Slink></Signupbtn>
    </Loginform>
    <Footprint2 src={process.env.PUBLIC_URL+`footprint.png`}></Footprint2>
    </>
    )}

export default withRouter(Login)