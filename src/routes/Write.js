import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Nickname from '../components/Nickname'
import { useForm } from 'react-hook-form'
import { bookdataAtom, writedataAtom } from '../utils/Atom'
import { useRecoilState } from 'recoil'
import { ResultApi } from 'utils/KakaoApi'

const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;`

const Title = styled.div`
width: 8rem;
font-size: 28px;
margin-top: 2.2rem;
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
max-width: 50rem;
min-width: 400px;
font-size: 12px;
@media screen and (max-width: 700px) {
        
    }
`

const Inputbox = styled.input`
border: none;
border-top: 2px solid #828282;
height: 2rem;
width: 100%;
:focus {outline:none;};
font-size: 15px;
padding-left: 7px;
`

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

const Ratebox = styled.input`
margin-top: 0.5rem;`

const Rate = styled(Inputbox)`
text-align: start;`

const Write = ({ history }) => {
    const [isbn, setIsbn] = useState('')
    const [bookdata, setBookData] = useRecoilState(bookdataAtom)
    const [writedata, setWriteData] = useRecoilState(writedataAtom)
    const [changeFirst, setChangeFirst] = useState(false)
    const [rate, setRate] = useState(0)
    const { register, handleSubmit } = useForm()
    const booktitledefault = (history.location.pathname === '/write') ? '' : bookdata[0].bookTitle
    const bookauthordefault = (history.location.pathname === '/write') ? '' : bookdata[0].bookAuthors

    useEffect(() => {
        if (changeFirst){
            sendPost()
        }
    }, [changeFirst])

    const sendPost = () => {
        axios.post("http://0.0.0.0:8000/review/", {
            uid: sessionStorage.getItem('uid'),
            bid: bookdata[0].isbn || isbn,
            rtitle: writedata[0].writeTitle,
            date: calculateDay,
            rtext: writedata[0].writeTxt,
            rate: +rate
        }).then(function (response) {
            console.log(response)
            alert(response.data.message)
        }).catch(function (error) {
            console.log(error)
            alert('문제가 발생했습니다.')
        }).finally(() => {
            toReview()
        })
    }

    const toReview = () => history.push('/review')

    async function booksdata(title, author) {
        const params = {
            target: 'title' & 'person',
            query: title, author,
            size: 1,
        };
        const { data: { documents } } = await ResultApi(params);
        setIsbn(documents[0].isbn)
    }

    const writeSubmit = async (data) => {
        await booksdata(data.btitle, data.bauthor)
            setWriteData(() => [{ 'writeTitle': data.rtitle, 'writeTxt': data.rtext }])
            if (history.location.pathname === '/write') {
                setBookData(() => [{ 'bookTitle': data.btitle, 'bookAuthors': data.bauthor }])
            }
        setChangeFirst(true)
    }

    const calculateDay = () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth()
        const date = today.getDate()
        const day = year + '.' + month + '.' + (date + 1) + '.'
        return day
    }

    return (
        <>
            <Nickname />
            <Top />
            <Navigation />
            <Body>
                <Title>글쓰기</Title>
                <Writeform onSubmit={handleSubmit(writeSubmit)}>
                    <Inputbox placeholder='제목' {...register("rtitle", { required: "input your title", maxLength: 30 })}></Inputbox>
                    <Inputbox placeholder='책 제목' {...register("btitle", { required: "input book title" })} defaultValue={booktitledefault}></Inputbox>
                    <Inputbox placeholder='지은이' {...register("bauthor", { required: "input author" })} defaultValue={bookauthordefault}></Inputbox>
                    <Rate as="div">
                        <Ratebox type="radio" name="rate" value="1" onClick={(e) => setRate(e.target.value)} />★
                        <Ratebox type="radio" name="rate" value="2" onClick={(e) => setRate(e.target.value)} />★★
                        <Ratebox type="radio" name="rate" value="3" onClick={(e) => setRate(e.target.value)} />★★★
                        <Ratebox type="radio" name="rate" value="4" onClick={(e) => setRate(e.target.value)} />★★★★
                        <Ratebox type="radio" name="rate" value="5" onClick={(e) => setRate(e.target.value)} />★★★★★
                    </Rate>
                    <Textbox  {...register("rtext", { required: "input your text", maxLength: 1000 })}></Textbox>
                    <Subm onClick={handleSubmit(writeSubmit)}>등록</Subm>
                </Writeform>
            </Body>
        </>
    )
}

export default withRouter(Write)