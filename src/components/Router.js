import React from "react";
import {BrowserRouter, Switch} from 'react-router-dom'
import PrivateRoute from "../lib/PrivateRoute";
import PublicRoute from "../lib/PublicRoute";
import Home from '../routes/Home'
import Info from "../routes/Info";
import Login from '../routes/Login'
import Signup from '../routes/Signup'
import Storage from "../routes/Storage";
import Write from "../routes/Write";
import Review from '../routes/Review'
import Edit from '../routes/Edit'
import Detail from "../routes/Detail";
import SearchResult from "../routes/SearchResult";

const Router = () => {
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <PublicRoute path='/' component={Home} exact></PublicRoute>
                <PublicRoute path='/searchresult' component={SearchResult} exact></PublicRoute>
                <PublicRoute restricted path='/login' component={Login}  exact></PublicRoute>
                <PublicRoute restricted path='/signup' component={Signup} exact></PublicRoute>
                <PrivateRoute path='/storage' component={Storage} exact></PrivateRoute>
                <PrivateRoute path='/write' component={Write} exact></PrivateRoute>
                <PrivateRoute path='/write/api' component={Write} exact></PrivateRoute>
                <PrivateRoute path='/info' component={Info} exact></PrivateRoute>
                <PrivateRoute path='/review' component={Review} exact></PrivateRoute>
                <PrivateRoute path='/detail' component={Detail} exact></PrivateRoute>
                <PrivateRoute path='/detail/:bookid' component={Detail} exact></PrivateRoute>
                <PrivateRoute path='/edit' component={Edit} exact></PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Router