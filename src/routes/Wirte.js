import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'

//서평쓰기 폼 구현

const Writeform = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
text-align: center;`

const Title = styled.div`
display: flex;
text-align: center;
`

const Write = () => {
    return(
        <>
        <Top />
        <Navigation />
    <Writeform>
        <Title>글쓰기</Title>
    </Writeform>
    </>
    )}

export default Write