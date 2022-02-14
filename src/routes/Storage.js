import React from 'react'
import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from 'axios'
import Nickname from 'components/Nickname'
import { withRouter } from 'react-router-dom'
import { ResultApi } from '../ResultApi'
import { reviewdataAtom } from 'components/Atom'
import { useSetRecoilState, useRecoilState } from "recoil"


//서평 공간 구현

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
const Noform = styled.div`
font-size: 20px;
margin: 20vh 0;`

const Storeform = styled.li`    
font-family: 'YanoljaYacheR';
display: flex;
align-items: center;
align-content: center;
width: 48rem;
height: 12rem;
margin-top: 2.7rem;
margin-left: 50%;
transform: translateX(-50%);
background: #F3CACA;
`
const Bookimg = styled.img`
height: 100%;
width: 9.2rem;
`
const Bookcontainer = styled.div`
display: flex;
flex-direction: column;
width: 37rem;
margin-left: 14px;
margin-right: 14px;
height: 11.9rem;
text-align: start;`

const Writetitle = styled.div`
font-weight: 600;
font-size: 28px;
margin-top: 1.5rem;
height: 4rem;`

const Booktitle = styled.div`
font-weight: 400;
font-size: 19px;
height: 3.3rem;`

const Writecontent = styled.div`
font-weight: 100;
font-size: 16px;
height: 4.5rem;
width: 34rem;
`

const Date = styled.div`
text-align: end;
margin-bottom: 0.3rem;
`

const Storage = ({history}) => {
    const [datas, setDatas] = useState([]) 
    const [bookdata, setBookdata] = useState([])
    const [noData, setNoData] = useState(true) 
    const setreviewdata = useSetRecoilState(reviewdataAtom)


    //장고로 부터 데이터 가져오는 api
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/review/')
        .then((response) => {
            setDatas(response.data)
            setNoData(false)
            console.log((response.data))
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    //isbn으로 책 img 가져오기
    /* function booksdata(word) {
        const params = {
            target: 'isbn',
            query: word.bookId,
            size: 1,
    };
    const {data: {documents}} = ResultApi(params); console.log(documents); 
    setBookdata(documents[0])
    }  

    useEffect(()=>{
        if(datas!==''){
            booksdata(datas)
        }
    }, [datas])*/
     

    //book id를 이용해 상세페이지로 이동 
    const moveDetail = (data) => {
        console.log(data)
        setreviewdata(() => [{'bookId': data.bookId, 'reviewId': data.id, 'reviewTitle': data.reviewTitle, 'reviewDate': data.reviewDate, 'reviewTxt': data.reviewTxt, 'reviewRate': data.reviewRate, 'userId': data.userId}])
        history.push(`/detail/${data.bookId}`)        //reviewId 추가
    }
   
    return(
        <>
        <Nickname />
        <Top />
        <Navigation />
    <Body>
        <Title>서평 공간</Title>
        {noData ? <Noform>작성한 서평이 없습니다</Noform> : 
        <ul>
        {datas && datas.map((data)=> <Storeform key={data.id} onClick={() => moveDetail(data)}>
                <Bookimg src={bookdata.thumbnail}></Bookimg>  
                <Bookcontainer>
                <Writetitle>{data.reviewTitle}</Writetitle>   {/*// 모델 수정 必 */}
                <Booktitle>{data.bookId}</Booktitle>    
                <Writecontent>{data.reviewTxt}...</Writecontent>
               {/* rid 받아서 리뷰 구분할 필요 없을까?*/}
               <Date>{data.reviewDate}</Date>
                </Bookcontainer>
            </Storeform>
        )}
        </ul>
    }
    </Body>
    </>
    )}

export default withRouter(Storage)