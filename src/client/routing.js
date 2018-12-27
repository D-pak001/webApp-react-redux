import React from 'react';
//import '../index.css';
import App from '../App';
import Login from './components/login'
import Signup from './components/register'
import Welcome from './components/welcome'
import NotFound from './components/notFound'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserPlus, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import profileBoard from './components/profileBoard';

const routing = () =>

  <Router>
    <div>
    
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/profile" component={profileBoard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>


export default routing;