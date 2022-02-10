import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import Nickname from 'components/Nickname'
import axios from 'axios'
import { useState } from 'react/cjs/react.development'


//내 정보 구현

const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;
`
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

const Infoform = styled.form`
margin-left: 50%;
transform: translateX(-50%);
width: 50rem;
margin-top: 3.7rem;
border: 1px solid #828282;
height: 23rem;
display: flex;
flex-direction: column;
align-items: center;
`
const NickEml = styled.div`
margin-top: 2.7rem;
display: flex;
flex-direction: row;
`
const Nick = styled.div`
text-align: start;
padding-left: 13px;
margin-right: 6rem;
width: 16rem;
background: #F3CACA;
height: 5.7rem;
border-radius: 0.5rem;`

const Nicktit = styled.div`
opacity: 60%;
margin-top: 0.7rem;`

const Email = styled.div`
text-align: start;
padding-left: 13px;
width: 16rem;
background: #F3CACA;
height: 5.7rem;
border-radius: 0.5rem;
`

const Emailtit = styled.div`
opacity: 60%;
margin-top: 0.7rem;`

const Useremail = styled.div`
text-align: center;
margin-top: 1vh;
`
const Usernick = styled(Useremail)``

const Pswform = styled.form`
text-align: start;
margin-top: 3.5rem;
display: flex;
flex-direction: column;`

const Pswtit = styled.div`
padding-left: 3rem;
margin-bottom: 1rem;
font-size: 17px;`

const Pswbox = styled.div`
margin-left: 3rem;
`

const Boxone = styled.input`
border: none;
margin-right: 3rem;
width: 10rem;
height: 2.3rem;
border-radius: 0.5rem;
:focus {outline:none;};
border: #828282 1px solid;
`

const Pswedit = styled.button`
outline: none;
border: none;
width: 6rem;
height: 2.3rem;
color: #D15C5C;
border: 1.5px solid #D15C5C;
background-color: #FFFFFF;
border-radius: 0.5rem;
margin-top: 1.8rem;
margin-left: 34.6rem;
font-family: 'YanoljaYacheR' !important;
font-size: 15px;
`

const Info = () => {
    const [newPw, setnewPw] = useState()
    const [checkPw, setCheckPw] = useState()
    const [curPw, setCurPw] = useState()

    const email = sessionStorage.getItem('email')
    const nickname = sessionStorage.getItem('nickname')
    const id = sessionStorage.getItem('id')
    const pw = sessionStorage.getItem('pw')

    const onChange = (e) => {
        const {target: {value, name}} = e
        if (name === 'curpw'){
            setCurPw(value)
        } else if (name === 'newpw') {
            setnewPw(value)
        } else {
            setCheckPw(value)
        }
    }

    const changePw = (e) => {
        e.preventDefault()
        if (pw === curPw && newPw === checkPw) {
            axios.put(`http://localhost:8000/user/info/${id}`, {
            userPw: newPw,
          })
          .then(function (response) {
            console.log(response.message);
          })
          .catch(function (error) {
            console.log(error.message);
          });
        } else {
            alert('비밀번호를 확인해주세요')
        }
        
    }

    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
    <Body>
        <Title>나의 정보</Title>
        <Infoform>
            <NickEml>
                <Nick>
                    <Nicktit>닉네임</Nicktit>
                    <Usernick>{nickname}</Usernick>
                </Nick>
                <Email>
                    <Emailtit>이메일</Emailtit>
                    <Useremail>{email}</Useremail>
                </Email>
            </NickEml>
            <Pswform>
                <Pswtit>비밀번호 변경</Pswtit>
                <Pswbox onSubmit={changePw}>
                    <Boxone type='password' name='curpw' placeholder='현재 비밀번호' value={curPw} onChange={onChange}></Boxone>
                    <Boxone type='password' name='newpw' placeholder='새 비밀번호' value={newPw} onChange={onChange}></Boxone>
                    <Boxone type='password' name='checkpw' placeholder='새 비밀번호 확인' value={checkPw} onChange={onChange}></Boxone>
                <Pswedit>비밀번호 변경</Pswedit>
                </Pswbox>
            </Pswform>
            
        </Infoform>
    </Body>
    </>
    )}

export default Info