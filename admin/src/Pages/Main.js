// setting for router

import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main(){
    return (
        <Router>      
            <Switch>
            <Route path='/login' component={Login} />
            <Route path="/"  component={AdminIndex} />
            </Switch>
        </Router>
    )
}
export default Main