import axios from 'axios';

//검색 결과 화면 api
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY

const client = axios.create({
  baseURL: `https://dapi.kakao.com`,
  headers: {
    'Authorization': `KakaoAK ${REST_API_KEY}`,
  },
});

export const ResultApi =  (params) => {return client.get('/v3/search/book', {params})}
