import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import CatImg from '../maincat2.png'

//고양이와 책을 메인 타이틀//
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
const Catimg = styled.img`
width: 65px;
height: 58px;
margin-top: 30px;
position: relative;
`
const Slink = styled(Link)`
text-decoration: none;
color: black;`

const Top = ({location:{pathname}}) => {
    return (
            <Titleset>
            <Title current={pathname==='/'}><Slink to="/">고양이와 책을</Slink></Title>
            <Catimg src={CatImg} alt='메인 고양이 이미지'></Catimg>
            </Titleset>
    )
}

export default withRouter(Top)