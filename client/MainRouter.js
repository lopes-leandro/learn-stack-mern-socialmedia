import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';
import EditProfile from './user/EditProfile';
import Menu from './core/Menu';

const MainRouter = () => {
    return(<div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/users" component={Users}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/signin" component={Signin}></Route>
            <PrivateRoute path="/user/edit/:userId" component={EditProfile}></PrivateRoute>
            <Route path="/user/:userId" component={Profile}></Route>
        </Switch>
    </div>)
}

export default MainRouter;