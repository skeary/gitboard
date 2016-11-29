
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

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

'use strict';


const React = require('react');

import { Link } from 'react-router';

const Utils = require('../utils');
const UserApi = require('../api/github/user');
const FlashMessages = require('./generic/flash_messages');
const LoaderMixin = require('./mixins/loader');


var Menu = React.createClass({

  mixins: [LoaderMixin],

  resources: function (props) {

    var logout = function () {
      Utils.logout();
      Utils.redirectTo(Utils.makeUrl('/login'));
    };

    if (Utils.isLoggedIn()) {
      return [
        {
          name: 'user',
          endpoint: this.apis.user.getProfile,
          nonBlocking: true,
          nonCritical: true,
          error: logout
        }
      ];
    }
    return [];
  },

  silentLoading: true,
  displayName: 'Menu',

  getInitialState: function () {
    return { user: { admin: false }, project: { roles: { admin: [] } } };
  },

  getDefaultProps: function () {
    return {};
  },

  componentWillMount: function () {
    this.userApi = UserApi.getInstance();
  },

  render: function () {

    var projectMenu;
    var adminMenu;

    var FlashMessagesMenu = FlashMessages.FlashMessagesMenu;
    var flashMessagesMenu = <FlashMessagesMenu baseUrl={this.props.baseUrl} params={this.props.params} />;
    flashMessagesMenu = undefined;  /* quick switch to activate or deactivate */

    if (Utils.isLoggedIn()) {
      return (
        <div ref="navMain" id="nav-main" className="nav-collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Your Repositories</Link></li>
            <li><Link to="/organizations">Your Organizations</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {projectMenu}
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      );
    }
    else {
      return (
        <div ref="navMain" id="nav-main" className="nav-collapse">
          <ul key="item1" className="nav navbar-nav">
          </ul>
          <ul key="item2" className="nav navbar-nav navbar-right">
            <li><Link to="/login">Login</Link></li>
            {flashMessagesMenu}
          </ul>
        </div>
      );
    }
  }
});

module.exports = Menu;

