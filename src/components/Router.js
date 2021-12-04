import React from "react";
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from '../routes/Home'
import Info from "../routes/Info";
import Login from '../routes/Login'
import Signup from '../routes/Signup'
import Storage from "../routes/Storage";
import Write from "../routes/Wirte";

const Router = () => {
    return(
        <HashRouter>
            <Switch>
                <Route path='/' component={Home} exact></Route>
                <Route path='/login' component={Login}  exact></Route>
                <Route path='/signup' component={Signup} exact></Route>
                <Route path='/storage' component={Storage} exact></Route>
                <Route path='/write' component={Write} exact></Route>
                <Route path='/info' component={Info} exact></Route>
            </Switch>
        </HashRouter>
    )
}

export default Router