import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from 'axios'
import Nickname from 'components/Nickname'


//서평 공간 구현
const Loader = styled.div``


const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;
align-items: center;`

const Reviewform = styled.div`
margin-top: 3rem;
width: 50rem;
height: 31rem;
background: #F5E5E5;
text-align: center;
align-items: center;
align-content: center;`

const ReviewTitle = styled.div`
padding-top: 2rem;
padding-bottom: 1rem;
font-size: 30px;
`
/*
const Bookinfo = styled.div`
border-top: 1px solid black;
border-bottom: 1px solid black;
height: 13rem;
width: 40rem;
margin-left: 50%;
transform: translateX(-50%);
`
*/
const Reviewtext = styled.div`
width: 40rem;
text-align: start;
padding-left: 5.6rem;
padding-top: 1rem;
font-size: 20px;
padding-bottom: 2rem;`

const Bookinfo = styled.div`
display: flex;
align-items: center;
align-content: center;
width: 45rem;
height: 15rem;
margin-top: 0.5rem;
margin-left: 50%;
transform: translateX(-50%);
border-top: 0.1rem solid black;
border-bottom: 0.1rem solid black;
`

const Bookimg = styled.img`
height: 90%;
`
const Bookcontainer = styled.div`
display: flex;
flex-direction: column;
margin-left: 14px;
margin-right: 14px;
text-align: start;`

const Booktitle = styled.div`
font-size: 28px;
margin-bottom: 1rem;`

const Bookauthors = styled.div`
font-size: 23px;
margin-bottom: 1rem;`

const Bookcontents = styled.div`
font-size: 19px;
width: 34rem;`

const Btn = styled.div`
display: flex;
flex-direction: row;`

const Edit = styled.button`
margin-top: 1rem;
margin-right: 1rem;
width: 7.5rem;
height: 2.3rem;
background: #E8A5A5;
border: none;
outline: none;
font-family: 'YanoljaYacheR' !important;
font-size: 17px;`

const Delete = styled.button`
margin-top: 1rem;
width: 7.5rem;
height: 2.3rem;
background: #E8A5A5;
border: none;
outline: none;
font-family: 'YanoljaYacheR' !important;
font-size: 17px;`

const Review = () => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)
    const id = window.sessionStorage.getItem('id')

    useEffect(()=>{
        axios.get(`http://127:0.0.1:8000/review/${id}`)
        .then((response) => {
            setData(...response.data)
            console.log(response.data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    /*
    async function booksdata() {
        let btitle = window.localStorage.getItem('btitle')
        let author = window.localStorage.getItem('rauthor')
        const params = {
            target: 'title' & 'person',
            query: btitle, author,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents);
    setData(documents)
    setLoading(false)
} 
useEffect(() => {
    booksdata()
},[])
*/

    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
        {loading ? <Loader>Loading</Loader> : 
    <Body>
        <Reviewform>
            <ReviewTitle>{data.rtitle}</ReviewTitle>
            <Bookinfo>
                <Bookimg src={data.img}></Bookimg>
                <Bookcontainer>
                <Booktitle>{data.btitle}</Booktitle>
                <Bookauthors>{data.author}</Bookauthors>
                <Bookcontents>{data.info}...</Bookcontents>
                </Bookcontainer>
            </Bookinfo>
            <Reviewtext>{data.text}</Reviewtext>
        </Reviewform>
        <Btn>
       <Edit>수정</Edit>
        <Delete>삭제</Delete>
        </Btn>
    </Body>
    }
    </>
    )}

export default Review