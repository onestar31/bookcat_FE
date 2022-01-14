import React, {useState} from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

//회원가입 구현

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

const Nickname = styled.input`
margin: 80px 0 0 24px;
width: 340px;
font-size: 16px;
color: white;
background: transparent;
border: none;
border-bottom: solid #FFFFFF 1px;
:focus{outline: none};
::placeholder{color: white;font-size: 14px;}
`

const Email = styled.input`
margin: 40px 0 0 24px;
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
margin-top: 80px;
margin-bottom: 47px;
transform: translateX(-50%);
`
const Asksignup = styled.span`
font-size: 14px;
color: white;
position: relative;
margin-left: 21%;

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

const Signup = ({history}) => {
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChange = (e) => {
        const {target: {value, name}} = e
        if (name === 'nickname'){
            setNickname(value)
        } else if (name === 'email'){
            setEmail(value)
        } else {
            setPassword(value)
        }
    }

// submit시 서버로 axios 요청하여 signup
    const onSubmit = (e) => {
      e.preventDefault()
      axios.post("http://localhost:8080/signup", {
        nickname: nickname,
        password: password,
        email: email
    }).then(function (response) {
        if(response.data.code == 0){ 
          history.push("/login");
        } else {
            alert('fail to signup')
            }
    }).catch(function (error) {
        console.log(error);
        alert('fail to signup')
    });}

    // signup 제2의 방법 주석 처리
/*const onSubmit = (e) => {
    let data = {
            id: id,
            pw: pw
        }
        axios
        .post(url,  JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    e.preventDefault()
    await axios.post('DB이름', {
      params: {
        nickname : nicknameState,
        email : emailState,
        password : passwordState
      }
    }).then(()=> {alert('회원가입 성공!'); history.push('/login')})
.catch(() => alert('회원가입 실패'))};
*/
    
    return(
        <>
    <Top />
    <Navigation />
    <Logintit>회원가입</Logintit>
    <Footprint1 src="footprint.png"></Footprint1>
    <Loginform onSubmit={onSubmit}>
        <Nickname type="text" required placeholder='닉네임' name="nickname" value={nickname} onChange={onChange}></Nickname><br/>
        <Email type="email" required placeholder='이메일' name="email" value={email} onChange={onChange}></Email><br/>
        <Password type="password" required placeholder='비밀번호' name="password" value={password} onChange={onChange}></Password><br/>
        <Loginbtn>회원가입</Loginbtn><br/>
        <Asksignup>이미 회원이신가요?</Asksignup>
        <Signupbtn><Slink to="/login">로그인 하기</Slink></Signupbtn>
    </Loginform>
    <Footprint2 src={process.env.PUBLIC_URL+`footprint.png`}></Footprint2>
    </>
    )

    }
export default withRouter(Signup)