import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

const Box = styled.div``

const Nick = styled.span``

const Logout = styled.button``

const Login = styled.span``

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
            <Login>로그인 해주세요</Login>
            </Box>
        }
        </> 
    )
}

export default withRouter(Nickname)