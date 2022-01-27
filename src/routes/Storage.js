import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from 'axios'
import Nickname from 'components/Nickname'


//서평 공간 구현

const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;`

const Title = styled.div`
width: 8rem;
font-size: 28px;
margin-top: 3.7rem;
margin-left: 50%;
transform: translateX(-50%);
text-align: center;
align-content: center;
border-bottom: 2px black solid;
padding-bottom: 4px;
`
const Storeform = styled.div`
display: flex;
align-items: center;
align-content: center;
width: 48rem;
height: 12rem;
margin-top: 2.7rem;
margin-left: 50%;
transform: translateX(-50%);
background: #F3CACA;
`
const Bookimg = styled.img`
height: 100%;
width: 9.2rem;
`
const Bookcontainer = styled.div`
display: flex;
flex-direction: column;
margin-left: 14px;
margin-right: 14px;
text-align: start;`

const Writetitle = styled.div`
font-size: 28px;
margin-bottom: 1rem;`

const Booktitle = styled.div`
font-size: 23px;
margin-bottom: 1rem;`

const Bookcontents = styled.div`
font-size: 19px;
width: 34rem;`

const Storage = () => {
    const [datas, setData] = useState('')

    //장고로 부터 데이터 가져오는 api
    useEffect(()=>{
        axios.get('http://127:0.0.1:8000/review')
        .then((response) => {
            setData(...response.data)
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
    <Body>
        <Title>서평 공간</Title>
    {datas.map((data)=> {
        <Storeform>
                <Bookimg src={data.img}></Bookimg>
                <Bookcontainer>
                <Writetitle>{data.rtitle}</Writetitle>
                <Booktitle>{data.btitle}</Booktitle>
                <Bookcontents>{data.text}...</Bookcontents>
                </Bookcontainer>
        </Storeform>
        })}
    </Body>
    </>
    )}

export default Storage