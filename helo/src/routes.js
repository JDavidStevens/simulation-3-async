import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import Profile from './components/profile/profile';
import SearchPage from './components/search/search';

export default(
    <Switch>
        <Route component={Login} exact path='/'/>
        <Route component={Dashboard} path= '/dashboard'/>
        <Route component={Profile} path= '/profile/:id'/>
        <Route component={SearchPage} path= '/search'/>
    </Switch>
)