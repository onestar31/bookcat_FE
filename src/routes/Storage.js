import Navigation from '../components/Navigation'
import Top from '../components/Top'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nickname from '../components/Nickname'
import { withRouter } from 'react-router-dom'
import { ResultApi } from '../utils/KakaoApi'
import { reviewdataAtom } from '../utils/Atom'
import { useSetRecoilState } from "recoil"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Body = styled.div`
font-family: 'YanoljaYacheR';
display: flex;
flex-direction: column;
text-align: center;
align-content: center;`

const Title = styled.h1`
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
position: relative;
font-family: 'YanoljaYacheR';
display: flex;
align-items: center;
align-content: center;
width: 48rem;
height: 12rem;
margin-top: 2.7rem;
margin-left: auto;
margin-right: auto;
background: #F3CACA;
@media screen and (max-width: 700px) {
        width: 500px;
        height: 400px;
        flex-direction: column;
    }
`
const Bookimg = styled.div`
height: 100%;
width: 9.2rem;
background-image: ${props => props.bground ? `url(${props.bground})` : `url(https://raw.githubusercontent.com/onestar31/bookcat_FE/master/src/nobookimg.jpg)`};
background-size : cover;
@media screen and (max-width: 700px) {
        height: 12rem;
        margin-top: 15px;
    }
`
const Bookcontainer = styled.div`
display: flex;
flex-direction: column;
width: 37rem;
margin-left: 14px;
margin-right: 14px;
height: 11.9rem;
text-align: start;
@media screen and (max-width: 700px) {
        text-align: center;
    }
`

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
@media screen and (max-width: 700px) {
        width: 470px;
        text-align: center;
        margin-left: 50%;
        transform: translateX(-50%);
    }
`

const Date = styled.div`
text-align: end;
margin-bottom: 0.3rem;
@media screen and (max-width: 700px) {
        position: absolute;
        right: 12px;
        bottom: 10px;
    }
`
const Rate = styled.div`
position: absolute;
top : 1.4rem;
right: 1.4rem;
display: flex;

`

const Star1 = styled.div`
position: relative;
color: ${(props) => props.rate>4 ? '#A17E00' : 'transparent'};`
const Star2 = styled(Star1)`
color: ${(props) => props.rate>3 ? '#A17E00' : 'transparent'};`
const Star3 = styled(Star1)`
color: ${(props) => props.rate>2 ? '#A17E00' : 'transparent'};`
const Star4 = styled(Star1)`
color: ${(props) => props.rate>1 ? '#A17E00' : 'transparent'};`
const Star5 = styled(Star1)`
color: ${(props) => props.rate>0 ? '#A17E00' : 'transparent'};`

const Storage = ({history}) => {
    const [datas, setDatas] = useState([]) 
    const [thumbnail, setThumbnail] = useState([])
    const [title, setTitle] = useState([])
    const [noData, setNoData] = useState(true) 
    const setreviewdata = useSetRecoilState(reviewdataAtom)

    //장고로 부터 데이터 가져오는 api
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/review/')
        .then((response) => {
            setDatas(response.data.filter((data) => data.userId === +sessionStorage.getItem('uid')))
            console.log(response.data)
            setNoData(false)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    useEffect (async() => {
        if (datas !== []){
        for (let i=0; i<datas.length; i++){
            await booksdata(datas[i].bookId)
        }
    }
    }, [datas])

     //isbn으로 책 img 가져오기
    async function booksdata(isbn) {
        isbn.indexOf(' ') !== -1 ? isbn = isbn.slice(11) : isbn = isbn
        const params = {
            target: 'isbn',
            query: isbn,
            size: 1,
    };
    const {data: {documents}} = await ResultApi(params);
    setThumbnail((olddata) => [...olddata, documents[0].thumbnail])
    setTitle((olddata) => [...olddata, documents[0].title])
    }

    //book id를 이용해 상세페이지로 이동 
    const moveDetail = (data) => {
        console.log(data)       //변수 이름 맞는지 확인하기
        setreviewdata(() => [{'bookId': data.bookId, 'reviewId': data.id, 'reviewTitle': data.reviewTitle, 'reviewDate': data.reviewDate, 'reviewTxt': data.reviewTxt, 'reviewRate': data.reviewRate, 'userId': data.userId}])
        history.push(`/detail`)        //reviewId 추가
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
        {datas && datas.map((data, idx)=> <Storeform key={data.id} onClick={() => moveDetail(data)}>
                <Bookimg bground={thumbnail[idx]}></Bookimg>
                <Rate>
                <Star1 rate={data.reviewRate}><FontAwesomeIcon icon={faStar} /></Star1>
                <Star2 rate={data.reviewRate}><FontAwesomeIcon icon={faStar} /></Star2>
                <Star3 rate={data.reviewRate}><FontAwesomeIcon icon={faStar} /></Star3>
                <Star4 rate={data.reviewRate}><FontAwesomeIcon icon={faStar} /></Star4>
                <Star5 rate={data.reviewRate}><FontAwesomeIcon icon={faStar} /></Star5>
                </Rate>
                <Bookcontainer>
                <Writetitle>{data.reviewTitle}</Writetitle>   {/*// 모델 수정 必 */}
                <Booktitle>{title[idx]}</Booktitle>    
                <Writecontent>{data.reviewTxt.length>129 ? data.reviewTxt.slice(0,130)+'...' : data.reviewTxt}</Writecontent>
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