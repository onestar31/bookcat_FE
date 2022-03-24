import React from 'react'
import styled from 'styled-components'
import {withRouter, Link} from 'react-router-dom'

const Box = styled.div`
font-family: 'YanoljaYacheR';
height: 2vh;
display: block;
text-align: right;
margin-right: 6%;
margin-top: 2vh;
@media screen and (max-width: 1100px) {
        margin-right: 4%;
    }
`

const Nick = styled.span``

const Slink = styled(Link)`
text-decoration: none;
color: black;`

const Logout = styled.button`
font-family: inherit;
width: 50px;
height: 3vh;
background: #E8A5A5;
border: none;
outline: none;`

const Login = styled.span`

`

const Nickname = ({history}) => {
    const nickname = sessionStorage.getItem('nickname')

    const Logouts = () => {
        sessionStorage.removeItem('nickname')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('uid')
        alert('로그아웃 되었습니다.')
        history.push('/')
    }
    return (
        <>
        {
            nickname ? 
            <Box>
            <Nick>{nickname} 님 </Nick>
            <Logout onClick={Logouts}>로그아웃</Logout>
            </Box> :
            <Box>
            <Login><Slink to={'/login'}>로그인 해주세요</Slink></Login>
            </Box>
        }
        </> 
    )
}

export default withRouter(Nickname)