/*
Copyright (c) 2015 - Andreas Dewes

This file is part of Gitboard.

Gitboard is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const MainApp = require('./components/App');
const Settings = require('./settings');
const Utils = require('./utils');

const Layout = require('./components/Layout');


import { Router, Route, browserHistory, IndexRoute } from 'react-router';


const Login = require('./components/user/login');
const Logout = require('./components/user/logout');

const Organizations = require('./components/Organizations');
const Repositories = require('./components/Repositories');
const Milestones = require('./components/milestones');
const Sprintboard = require('./components/board/sprintboard');


function requireAuth(nextState, replace) {
  if (!Utils.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout} onEnter={requireAuth}>
      <IndexRoute component={Repositories} />
      <Route path="logout" component={Logout} />
      <Route path="organizations" component={Organizations} />
      <Route path="milestones/:repositoryOwner/:repositoryName" component={Milestones} />
      <Route path="sprintboard/:repositoryOwner/:repositoryName/:milestoneId" component={Sprintboard} />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="/login/:loginType" component={Login} />    
  </Router>
), document.getElementById('layout'));


