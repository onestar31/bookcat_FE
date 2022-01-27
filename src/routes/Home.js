import { getByTitle } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import { ResultApi } from '../ResultApi'
import {withRouter} from 'react-router-dom'
import Nickname from 'components/Nickname'


//메인 검색 화면 및 검색 결과 화면 구현

const Body = styled.div`
position: relative;
font-family: 'YanoljaYacheR';
`

const Bodypic = styled.div`
position: absolute;
background-image: url(${process.env.PUBLIC_URL+'mainbookself.jpeg'});
width: 68vw;
height: 74vh;
opacity: 55%;
margin-left: 50%;
transform: translateX(-50%);`

const Keyform = styled.div`
position: absolute;
background-color: #F5E5E5;
opacity: 93%;
width: 400px;
height: 240px;
border-radius: 20px;
margin-left: 50%;
transform: translateX(-50%);
top: 160px;
text-align: center;
`
const Form = styled.form``
const Keytit = styled.div`
font-size: 32px;
color: #D15C5C;
margin: 23px 0 ;
`
const Keyexp = styled.div`
margin-bottom: 20px;
font-size: 18px;
`
const Keyinput = styled.input`
margin-bottom: 20px;
height: 24px;
`

const Search = styled.button`
background-color: #CB6C6C;
border-radius: 30px;
border: none;
color: white;
width: 110px;
height: 35px;`

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

const Home = ({history}) => {
    const [keyword, setKeyword] = useState('꿈꿀 권리')
    const [keyvalue, setKeyValue] = useState('')
    const [data, setData] = useState('data')
    const [change, setChange] = useState(true)

    useEffect (() => {
        async function booksdata() {
            const params = {
                target: 'title',
                query: keyword,
                size: 5,
        };
        const {data: {documents}} = await ResultApi(params); console.log(documents);
        setData(documents)
        
    } 
        booksdata()
    }, [keyword])

    const keyvaluefunc = (e) => {setKeyValue(e.target.value); console.log(e.target.value)}
    const putKeyWord = (e) => {
        e.preventDefault()
        setKeyword(keyvalue)
        setChange(false)
} 
    const toreview = (book) =>{
        let id = book.isbn
        history.push(`/write/${id}`)
        window.sessionStorage.setItem('id', book.isbn)
        window.sessionStorage.setItem('booktitle', book.title)
        window.sessionStorage.setItem('bookauthors', book.authors)
        window.sessionStorage.setItem('bookimg', book.thumbnail)
        window.sessionStorage.setItem('bookcontents', book.contents)

    }
    
    
    return(
        <>
    <   Nickname />
        <Top />
        <Navigation />
        {change ?
    <Body>
    <Bodypic></Bodypic>
    <Keyform>
        <Keytit>키워드를 입력하세요</Keytit>
        <Keyexp>고양이와 책을에서 키워드에 맞는 책을 읽고<br/> 나만의 서평을 작성해보세요</Keyexp>
        <Form onSubmit={putKeyWord}>
        <div><Keyinput type="text" value={keyvalue} onChange={keyvaluefunc}></Keyinput></div>
        <Search onSubmit={putKeyWord}>검색</Search>
        </Form>
        </Keyform>
    </Body> : 
    <Resultform>
        <Resultname>'{keyvalue}' 검색한 결과</Resultname>

    {data.map((book)=> <Resultbox>
        <Bookimg src={book.thumbnail}></Bookimg>
        <Bookcontainer>
        <Booktitle>{book.title}</Booktitle>
        <Bookauthors>{book.authors}</Bookauthors>
        <Bookcontents>{book.contents}...</Bookcontents>
        <Bookurl href={book.url}  target='_blank'>링크</Bookurl>
        <Bookreview onClick={() => toreview(book)}>서평 쓰기</Bookreview>
        </Bookcontainer>
        </Resultbox>)}
    </Resultform>}
    </>
    )}

export default withRouter(Home)