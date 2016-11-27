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

const MainApp = require('./components/app');
const Settings = require('./settings');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const Repositories = require('./components/repositories');
const Milestones = require('./components/milestones');
const Sprintboard = require('./components/board/sprintboard');


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MainApp}>
      <IndexRoute component={Repositories} />
      <Route path="milestones/:repositoryOwner/:repositoryName" component={Milestones} />
      <Route path="sprintboard/:repositoryOwner/:repositoryName/:milestoneId" component={Sprintboard} />
    </Route>
  </Router>
), document.getElementById('app'));


