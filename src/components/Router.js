import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from "lib/PrivateRoute";
import PublicRoute from "lib/PublicRoute";
import Home from '../routes/Home'
import Info from "../routes/Info";
import Login from '../routes/Login'
import Signup from '../routes/Signup'
import Storage from "../routes/Storage";
import Write from "../routes/Write";
import Review from '../routes/Review'

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute path='/' component={Home} exact></PublicRoute>
                <PublicRoute restricted path='/login' component={Login}  exact></PublicRoute>
                <PublicRoute restricted path='/signup' component={Signup} exact></PublicRoute>
                <PrivateRoute path='/storage' component={Storage} exact></PrivateRoute>
                <PrivateRoute path='/write/:id' component={Write} exact></PrivateRoute>
                <PrivateRoute path='/write' component={Write} exact></PrivateRoute>
                <PrivateRoute path='/info' component={Info} exact></PrivateRoute>
                <PrivateRoute path='/review' component={Review} exact></PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Router