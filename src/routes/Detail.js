import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from 'axios'
import Nickname from 'components/Nickname'
import { ResultApi } from '../ResultApi'
import { withRouter, useParams } from 'react-router-dom'
import { reviewdataAtom } from 'components/Atom'
import { useRecoilValue } from 'recoil'

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
    const [bookdata, setBookdata] = useState([])
    const [loading, setLoading] = useState(true)
    const reviewdata = useRecoilValue(reviewdataAtom) 
    const reviewbid = reviewdata[0].bookId


    //bid로 책 정보 가져오기
    async function booksdata(isbn10, isbn13) {
        const params = {
            target: 'isbn',
            query: isbn10 || isbn13,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents); 
    setBookdata(documents[0])
    } 

    useEffect(() => {
        if (reviewbid.indexOf(' ') !== -1){ //isbn10과 isbn13이 동시에 주어진 경우
            const isbn10 = reviewbid.slice(0,10)
            const isbn13 = reviewbid.slice(11)
            booksdata(isbn10, isbn13)
        } else {
            booksdata(reviewbid)
        }
        setLoading(false) //loading 이 너무 빨리 이루어진다 싶으면 async await 걸기
    },[])
    
    const moveEdit = () => {
        history.push('/edit')
    }

    //삭제 버튼 누르면 삭제 
    const goDelete = () => {
        console.log(reviewdata)
        axios.delete('http://127.0.0.1:8000/review/delete/', {data : {
        reviewId : reviewdata[0].reviewId
    }})
    .then(function (response) {
        alert(response.data.message)
        console.log(response);
    })
    .catch(function (error) {
        alert(error.response.data.message)
        console.log(error);
    })
    }

    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
        {loading ? <Loader>Loading...</Loader> : 
    <Body>
        <Reviewform>
            <ReviewTitle>{reviewdata[0].reviewTitle}</ReviewTitle>
            <Bookinfo>
                <Bookimg src={bookdata?.thumbnail}></Bookimg>
                <Bookcontainer>
                <Booktitle>{bookdata?.title}</Booktitle>
                <Bookauthors>{bookdata?.authors}</Bookauthors>
                <Bookcontents>{bookdata?.contents}...</Bookcontents>
                </Bookcontainer>
            </Bookinfo>
            <Reviewtext>{reviewdata[0].reviewTxt}</Reviewtext>
        </Reviewform>
        <Btn>
       <Edit onClick={moveEdit}>수정</Edit>
        <Delete onClick={goDelete}>삭제</Delete>
        </Btn>
    </Body>
    }
    </>
)}

export default withRouter(Detail)