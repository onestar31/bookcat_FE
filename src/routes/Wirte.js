import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { useState } from 'react/cjs/react.development'
import { withRouter } from 'react-router-dom'
import { ResultApi } from '../ResultApi'
import axios from 'axios'

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
    const booktitle = window.localStorage.getItem('booktitle')
    const bookauthor = window.localStorage.getItem('bookauthors')
    const [rtitle, setRtitle] = useState('')
    const [btitle, setBtitle] = useState(`${booktitle}`)
    const [text, setText] = useState('')
    const [author, setAuthor] = useState(`${bookauthor}`)
    const [data, setData] = useState('')

    async function booksdata(btitle, author) {
        const params = {
            target: 'title' & 'person',
            query: btitle, author,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params); console.log(documents);
    await setData(documents)
} 

    const changeText = (e) =>{
        if (e.target.name==='rtitle'){
        setRtitle(e.target.value)
    }else if (e.target.name==='btitle'){
        setBtitle(e.target.value)
    } else if (e.target.name==='rtext'){
        setText(e.target.value)
    } else {
        setAuthor(e.target.value)
    }
    }

    //임시로 localstorage에 저장했지만 이 부분은 DB에 정보를 보내는 코드(post)로 바뀌어야 함
    const submitText = (e) => {
        e.preventDefault()
        try {  
        window.localStorage.setItem('rtitle', (rtitle))
        window.localStorage.setItem('rtext', (text))
        window.localStorage.setItem('btitle', (btitle))
        window.localStorage.setItem('rauthor', (author))
            
        booksdata(btitle, author)

        //Review component에서 보여주기 위해 id를 임시로 저장하기
        

        //장고에 서평 정보 post 보내는 api
            axios.post("http://127.0.0.1:8000/review", {
                id : data.isbn,
                img : data.thumbnail,
                info : data.contents,
                btitle,
                author,
                rtitle,
                text
            }).then(function(response) {
                window.localStorage.setItem('id', data.isbn)
                console.log(response)
            }).catch(function(error) {console.log(error)
            }).finally(() => {
                history.push('/review')
            })
           
        } catch {
            console.log('somethis is wrong')
        }finally {
            console.log('done')}
    }


    return(
        <>
        <Top />
        <Navigation />
        <Body>
        <Title>글쓰기</Title>
        <Writeform onSubmit={submitText}>
            <Titlebox type='text' placeholder='제목' name="rtitle" value={rtitle} onChange={changeText}>
            </Titlebox>
            <Infobox type='text' placeholder='책 제목' name="btitle" value={btitle} onChange={changeText}>
            </Infobox>
            <Infobox type='text' placeholder='지은이' name="rauthor" value={author} onChange={changeText}>
            </Infobox>
            <Textbox type='text' name="rtext" value={text} onChange={changeText} maxLength='1000'></Textbox>
            <Subm onClick={submitText}>등록</Subm>
        </Writeform>
    </Body> 
    </>
    )}

export default withRouter(Write)