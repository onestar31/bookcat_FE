import React from 'react'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'

const Unlist = styled.ul`
text-align: center;
justify-content: center;
display: flex;
position: relative;
list-style: none;
flex-direction: row;
font-family: 'YanoljaYacheR';
margin-top: 26px;
padding: 6px 0;
background-color: #EBCACA;
max-width: 1100px;
margin-left: auto;
margin-right: auto;
font-size: 20px;
@media screen and (max-width: 700px) {
        flex-direction: column;
        width: 600px;
    }
`
const List = styled.li`
padding: 5px 70px 0 70px;
min-width: 55px;
text-align: center;
`
const Slink = styled(NavLink)`
text-decoration: none;
color: black;`


const Navigation = ({location:{pathname}}) => {
    const active = {color: 'white'}
    return (
            <Unlist>
                <List current={pathname==='/write'}><Slink activeStyle={active} to="/write">글쓰기</Slink></List>
                <List current={pathname==='/storage'}><Slink activeStyle={active} to="/storage">서평공간</Slink></List>
                <List current={pathname==='/login'}><Slink activeStyle={active} to="/login">로그인</Slink></List>
                <List current={pathname==='/info'}><Slink activeStyle={active} to="/info">내 정보</Slink></List>
            </Unlist>
    )
}

export default withRouter(Navigation)