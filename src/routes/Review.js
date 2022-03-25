import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import Nickname from '../components/Nickname'
import { ResultApi } from '../utils/KakaoApi'
import { withRouter } from 'react-router-dom'
import { bookdataAtom, writedataAtom } from '../utils/Atom'
import { useRecoilValue } from 'recoil'

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
margin-top: 4rem;
max-width: 50rem;
height: auto;
min-height: 31rem;
background: #F5E5E5;
text-align: center;
align-items: center;
align-content: center;
padding-left: 2rem;
padding-right: 2rem;
@media screen and (max-width: 700px) {
    height: auto;
    }`

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
padding-bottom: 2rem;
@media screen and (max-width: 700px) {
        text-align: center;
    }`

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
@media screen and (max-width: 700px) {
        flex-direction: column;
        height: 30rem;
    }
`
const Bookimg = styled.img`
height: 90%;
@media screen and (max-width: 700px) {
    margin-top: 15px;
    margin-bottom: 10px;
    width: 150px;
    height: 220px;
    }
`
const Bookcontainer = styled.div`
display: flex;
flex-direction: column;
margin-left: 14px;
margin-right: 14px;
text-align: start;
@media screen and (max-width: 700px) {
        text-align: center;
    }`

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

const List = styled.button`
margin-top: 1rem;
margin-right: 1rem;
width: 7.5rem;
height: 2.3rem;
background: #E8A5A5;
border: none;
outline: none;
font-family: 'YanoljaYacheR' !important;
font-size: 17px;
cursor: pointer;`


const Review = ({ history }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const bookvalue = useRecoilValue(bookdataAtom)
    const writevalue = useRecoilValue(writedataAtom)

    async function booksdata(title, author) {
        const params = {
            target: 'title' & 'person',
            query: title, author,
            size: 1,
        };
        const { data: { documents } } = await ResultApi(params); console.log(documents);
        setData(documents[0])
    }

    useEffect(() => {
        booksdata(bookvalue[0].bookTitle, bookvalue[0].bookAuthors)
        setLoading(false) //수정
    }, [])

    const toStorage = () => {
        history.push('/storage')
    }

    return (
        <>
            <Nickname />
            <Top />
            <Navigation />
            {loading ? <Loader>Loading...</Loader> :
                <Body>
                    <Reviewform>
                        <ReviewTitle>{writevalue[0].writeTitle}</ReviewTitle>
                        <Bookinfo>
                            <Bookimg src={data.thumbnail || `https://raw.githubusercontent.com/onestar31/bookcat_FE/master/src/nobookimg.jpg`}></Bookimg>
                            <Bookcontainer>
                                <Booktitle>{data.title}</Booktitle>
                                <Bookauthors>{data.authors}</Bookauthors>
                                <Bookcontents>{data.contents}...</Bookcontents>
                            </Bookcontainer>
                        </Bookinfo>
                        <Reviewtext>{writevalue[0].writeTxt}</Reviewtext>
                    </Reviewform>
                    <Btn>
                        <List onClick={toStorage}>목록</List>
                    </Btn>
                </Body>
            }
        </>
    )
}

export default withRouter(Review)