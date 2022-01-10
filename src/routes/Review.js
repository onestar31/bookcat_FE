import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'

//서평 공간 구현

const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;
align-items: center;`

const Reviewform = styled.div`
margin-top: 3.7rem;
width: 50rem;
height: 29rem;
background: #F5E5E5;
text-align: center;
align-items: center;
align-content: center;`

const ReviewTitle = styled.div`
padding-top: 2.5rem;
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
padding-top: 16px;
font-size: 20px;`

const Bookinfo = styled.div`
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

const Review = () => {
    return(
        <>
        <Top />
        <Navigation />
    <Body>
        <Reviewform>
            <ReviewTitle>{window.localStorage.getItem('rtitle')}</ReviewTitle>
            <Bookinfo>
                <Bookimg src={window.localStorage.getItem('bpicture')}></Bookimg>
                <Bookcontainer>
                <Booktitle>{window.localStorage.getItem('btitle')}</Booktitle>
                <Bookauthors>{window.localStorage.getItem('bauthor')}</Bookauthors>
                <Bookcontents>{window.localStorage.getItem('bcontents')}...</Bookcontents>
                </Bookcontainer>
            </Bookinfo>
            <Reviewtext>{window.localStorage.getItem('rtext')}</Reviewtext>
        </Reviewform>
    </Body>
    </>
    )}

export default Review