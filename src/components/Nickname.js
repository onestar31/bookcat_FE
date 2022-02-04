import React from 'react'
import styled from 'styled-components'
import {withRouter, Link} from 'react-router-dom'

const Box = styled.div`
font-family: 'YanoljaYacheR';
height: 2vh;
display: block;
text-align: right;
margin-right: 28vh;
margin-top: 2vh;
`

const Nick = styled.span``

const Slink = styled(Link)`
text-decoration: none;
color: black;`

const Logout = styled.button`
font-family: inherit;
width: 5vw;
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
        window.location.replace(`${history.location.pathname}`)
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