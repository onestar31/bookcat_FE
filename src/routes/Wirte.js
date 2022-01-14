import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { useState } from 'react/cjs/react.development'
import { withRouter } from 'react-router-dom'
import { ResultApi } from '../ResultApi'

//서평쓰기 폼 구현

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

const Writeform = styled.form`
margin-left: 50%;
transform: translateX(-50%);
margin-top: 3.7rem;
height: 25rem;
width: 50rem;
font-size: 12px;
`

const Titlebox = styled.input`
border: none;
border-top: 2px solid #828282;
height: 2rem;
width: 100%;
:focus {outline:none;};
font-size: 15px;
padding-left: 7px;
`

const Tit = styled.div``

const Infobox = styled.input`
border: none;
border-top: 2px solid #828282;
height: 2rem;
width: 100%;
:focus {outline:none;};
font-size: 15px;
padding-left: 7px;
`
const Info = styled.div``

const Textbox = styled.textarea`
border: 2px solid #828282;
height: 18rem;
width: 100%;
:focus {outline:none;};
resize: none;
font-size: 13px;
padding-left: 7px;
padding-top: 7px;
`

const Subm = styled.button`
margin-left: 100%;
transform: translateX(-100%);
margin-top: 1rem;
width: 7.5rem;
height: 2.3rem;
background: #E8A5A5;
border: none;
outline: none;
font-family: 'YanoljaYacheR' !important;
font-size: 17px;`

const Write = ({history}) => {
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [data, setData] = useState('')
    const authornum = window.localStorage.getItem('bookauthors').length


    const changeText = (e) =>{
        if (e.target.name==='rtitle'){
        setTitle(e.target.value)
    }else if (e.target.name==='rinfo'){
        setInfo(e.target.value)
    } else if (e.target.name==='rtext'){
        setText(e.target.value)
    } else {
        setAuthor(e.target.value)
    }
    }
    //책제목과 지은이를 이용한 api 검색 및 review 페이지에 띄우기
    async function booksdata() {
        if (history.location.pathname === '/write'){
        const params = {
            target: 'title' & 'person',
            query: info, author,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents);
    setData(documents)
    } else {
        let title = window.localStorage.getItem('booktitle')
        let authors = window.localStorage.getItem('bookauthors').substring(1, authornum-1)
        const params = {
            target: 'title' & 'person',
            query: title, authors,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents);
    setData(documents)
    }
    try{
    window.localStorage.setItem('btitle', JSON.stringify(data[0]).title)
    window.localStorage.setItem('bauthor', JSON.stringify(data[0].authors))
    window.localStorage.setItem('bpicture', JSON.stringify(data[0].thumbnail))
    window.localStorage.setItem('bcontents', JSON.stringify(data[0].contents))
    } catch { 
        console.log('somethis is wrong')
    } finally {
        history.push('/review')
    }
} 

    //임시로 localstorage에 저장했지만 이 부분은 DB에 정보를 보내는 코드(post)로 바뀌어야 함
    const submitText = (e) => {
        e.preventDefault()
        window.localStorage.setItem('rtitle', JSON.stringify(title))
        window.localStorage.setItem('rinfo', JSON.stringify(info))
        window.localStorage.setItem('rauthor', JSON.stringify(author))
        window.localStorage.setItem('rtext', JSON.stringify(text))
        booksdata()
        try {
        
        } finally {/*
        window.localStorage.setItem('btitle', JSON.stringify(data[0].title))
        window.localStorage.setItem('bauthor', JSON.stringify(data[0].authors))
        window.localStorage.setItem('bpicture', JSON.stringify(data[0].thumbnail))
        window.localStorage.setItem('bcontents', JSON.stringify(data[0].contents))
        */ console.log('done')}
    }


    return(
        <>
        <Top />
        <Navigation />
        {(history.location.pathname === '/write') ? 
        <Body>
        <Title>글쓰기</Title>
        <Writeform onSubmit={submitText}>
            <Titlebox type='text' placeholder='제목' name="rtitle" value={title} onChange={changeText}>
            </Titlebox>
            <Infobox type='text' placeholder='책 제목' name="rinfo" value={info} onChange={changeText}>
            </Infobox>
            <Infobox type='text' placeholder='지은이' name="rauthor" value={author} onChange={changeText}>
            </Infobox>
            <Textbox type='text' name="rtext" value={text} onChange={changeText}></Textbox>
            <Subm onClick={submitText}>등록</Subm>
        </Writeform>
    </Body> :
    <Body>
        <Title>글쓰기</Title>
        <Writeform onSubmit={submitText}>
            <Titlebox type='text' placeholder='제목' name="rtitle" value={title} onChange={changeText}>
            </Titlebox>
            <Infobox type='text' placeholder='책 제목' name="rinfo" value={window.localStorage.getItem('booktitle')} onChange={changeText}>
            </Infobox>
            <Infobox type='text' placeholder='지은이' name="rauthor" value={window.localStorage.getItem('bookauthors').substring(1, authornum-1)} onChange={changeText}>
            </Infobox>
            <Textbox type='text' name="rtext" value={text} onChange={changeText}></Textbox>
            <Subm onClick={submitText}>등록</Subm>
        </Writeform>
    </Body>}
    </>
    )}

export default withRouter(Write)