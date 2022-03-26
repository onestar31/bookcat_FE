import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

const Titleset = styled.div`
display: flex;
text-align: center;
align-items: center;
justify-content: center;
`
const Title = styled.span`
position: relative;
display: flex;
top: 5px;
font-family: 'YanoljaYacheR';
font-size: 40px;
margin-top: 30px;
`
const Catimg = styled.div`
width: 65px;
height: 58px;
margin-top: 30px;
position: relative;
background-image : url('https://raw.githubusercontent.com/onestar31/bookcat_FE/master/src/maincat2.png');
background-size : contain;
`
const Slink = styled(Link)`
text-decoration: none;
color: black;`

const Top = ({location:{pathname}}) => {
    return (
            <Titleset>
            <Title current={pathname==='/'}><Slink to="/">고양이와 책을</Slink></Title>
            <Catimg></Catimg>
            </Titleset>
    )
}

export default withRouter(Top)