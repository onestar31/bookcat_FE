import { getByTitle } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import { ResultApi } from '../ResultApi'
import {withRouter} from 'react-router-dom'
import Nickname from 'components/Nickname'
import {bookdataAtom} from 'components/Atom'
import {useSetRecoilState} from 'recoil' 

//메인 검색 화면 및 검색 결과 화면 구현

const Resultform = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
`

const Resultname = styled.div`
margin-top: 5rem;
text-align: center;
font-size: 30px;`

const Resultbox = styled.div`
display: flex;
align-items: center;
align-content: center;

width: 50rem;
height: 21rem;
margin-top: 4rem;
background: #EBCACA;`

const Bookimg = styled.img`
height: 90%;
margin-left: 2%;
`
const Bookcontainer = styled.div`
display: flex;
flex-direction: column;
margin-left: 14px;
margin-right: 14px;`

const Booktitle = styled.div`
font-size: 28px;
margin-bottom: 1rem;`

const Bookauthors = styled.div`
font-size: 23px;
margin-bottom: 1rem;`

const Bookcontents = styled.div`
font-size: 19px;
width: 34rem;`

const Bookurl = styled.a`
text-decoration: none;
margin-top: 1rem;
font-size: 19px;
color: #C05F5F;
width: 1.7rem;
border-bottom: 1px solid #C05F5F;`

const Bookreview = styled.button`
border: none;
outline: none;
font-family: inherit !important;
font-size: 20px;
width: 5rem;
padding: 5px 0px;
margin-top: 1rem;
margin-left: 80%;
text-align: center;
background: #E8A5A5;`

const SearchResult = ({history}) => {
    const [data, setData] = useState([])
    const keyword = window.sessionStorage.getItem('keyword')
    const setBookData = useSetRecoilState(bookdataAtom)

    async function booksdata(keyword) {
        const params = {
            target: 'title',
            query: keyword,
            size: 5,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents);
    setData(documents)
    
} 
    useEffect (() => {
        booksdata(keyword)
    }, [])
    
    const toreview = (book) =>{
        setBookData(()=> [{'isbn': book.isbn, 'bookTitle': book.title, 'bookAuthors': book.authors}])
        let id = book.isbn
        history.push(`/write/${id}`)
    }
    
    return(
        <>
    <   Nickname />
        <Top />
        <Navigation />
    <Resultform>
        <Resultname>'{keyword}' 검색한 결과</Resultname> 
    {data.map((book)=> <Resultbox key={book.isbn}>
        <Bookimg src={book.thumbnail || `${process.env.PUBLIC_URL}/nobookimg.jpg`}></Bookimg>
        <Bookcontainer>
        <Booktitle>{book.title}</Booktitle>
        <Bookauthors>{book.authors}</Bookauthors>
        <Bookcontents>{book.contents}...</Bookcontents>
        <Bookurl href={book.url}  target='_blank'>링크</Bookurl>
        <Bookreview onClick={() => toreview(book)}>서평 쓰기</Bookreview>
        </Bookcontainer>
        </Resultbox>)}
    </Resultform>
    </>
    )}

export default withRouter(SearchResult)