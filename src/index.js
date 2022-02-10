import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {RecoilRoot} from 'recoil' //RecoilRoot로 app을 감싸줘야함


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
