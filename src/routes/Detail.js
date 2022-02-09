import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from 'axios'
import Nickname from 'components/Nickname'
import { ResultApi } from '../ResultApi'
import { withRouter, useParams } from 'react-router-dom'

//서평 공간 구현
const Loader = styled.div`
display: block;
text-align: center;
margin: 30vh 0;`

const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;
align-items: center;`

const Reviewform = styled.div`
margin-top: 2rem;
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
const Reviewtext = styled.div`
width: 40rem;
text-align: start;
padding-left: 5.6rem;
padding-top: 1rem;
font-size: 19px;
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

const Detail = ({history}) => {
    const [data, setData] = useState([])
    const [bookdata, setBookdata] = useState([])
    const [loading, setLoading] = useState(true)
    const {bookid} = useParams() //url의 /:id 부분
    const userid = sessionStorage.getItem('email')

    //bid를 이용한 api로(?) 서평 정보 가져오기(이 때 userid를 같이 보내줘야하는지)
    useEffect(()=>{
        axios.get(`http://127:0.0.1:8000/review/${userid}/${bookid}`)  //api 임시로 설정해둔 것
        .then((response) => {
            setData(response.data)
            console.log(response.data)
            setLoading(true)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    
    //bid로 책 정보 가져오기
    async function booksdata(data) {
        const params = {
            target: 'isbn',
            query: data.bid,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents);
    setBookdata(documents[0])
    setLoading(true) //연동 이후 false 
} 

useEffect(() => {
    if (data!=='')
    booksdata(data)
},[data])

const moveEdit = () => {
    history.push('/edit')
}

    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
        {loading ? <Loader>Loading...</Loader> : 
    <Body>
        <Reviewform>
            <ReviewTitle>{data.reviewTitle}</ReviewTitle>
            <Bookinfo>
                <Bookimg src={bookdata.thumbnail}></Bookimg>
                <Bookcontainer>
                <Booktitle>{bookdata.title}</Booktitle>
                <Bookauthors>{bookdata.authors}</Bookauthors>
                <Bookcontents>{bookdata.contents}...</Bookcontents>
                </Bookcontainer>
            </Bookinfo>
            <Reviewtext>{data.reviewTxt}</Reviewtext>
        </Reviewform>
        <Btn>
       <Edit onClick={moveEdit}>수정</Edit>
        <Delete>삭제</Delete>
        </Btn>
    </Body>
    }
    </>
    )}

export default withRouter(Detail)