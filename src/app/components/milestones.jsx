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
const $ = require('jquery');
const Moment = require('moment');

const Utils = require('../utils');
const LoaderMixin = require('./mixins/loader');
const GithubErrorHandlerMixin = require('./mixins/github_error_handler');
import { Link } from 'react-router';


var MilestoneItem = React.createClass({

  render: function () {
    var due;
    if (this.props.milestone.due_on !== null) {
      var datestring = Moment(new Date(this.props.milestone.due_on)).fromNow();
      due = [<i className="octicon octicon-clock" />, ' ', datestring];
    }
    return <div className="col-md-3">
      <div className="panel panel-primary milestone-item">
        <Link to={"/sprintboard/" + this.props.repository.full_name + "/" + this.props.milestone.number}>
          <div className="panel-body">
            <h4>{this.props.milestone.title}</h4>
            <span className="label label-danger">{this.props.milestone.open_issues}open</span>&nbsp;
            <span className="label label-success">{this.props.milestone.closed_issues}closed</span>
            <span className="pull-right">{due}</span>
          </div>
        </Link>
      </div>
    </div>;
  }
});

var Milestones = React.createClass({

  mixins: [LoaderMixin, GithubErrorHandlerMixin],

  resources: function (props) {
    console.log(props);
    const repositoryId = `${props.params.repositoryOwner}/${props.params.repositoryName}`;
    return [
      {
        name: 'repository',
        endpoint: this.apis.repository.getDetails,
        params: [repositoryId, {}],
        success: function (data) {
          return { repository: data };
        }.bind(this)
      },
      {
        name: 'milestones',
        endpoint: this.apis.milestone.getMilestones,
        params: [repositoryId, { per_page: 100 }],
        success: function (data, xhr) {
          var arr = [];
          for (var i in data) {
            if (data.hasOwnProperty(i) && !isNaN(+i)) {
              arr[+i] = data[i];
            }
          }
          return { milestones: arr };
        }.bind(this)
      }
    ];
  },

  displayName: 'Milestones',

  render: function () {
    var data = this.state.data;

    var milestoneItems = data.milestones.map(function (milestone) {
      return <MilestoneItem key={milestone.number} milestone={milestone} repository={data.repository} />;
    }.bind(this))

    if (milestoneItems.length == 0)
      milestoneItems = [<p className="alert alert-info">Seems there is nothing to show here.</p>]

    return <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>Milestones - {data.repository.name}</h3>
        </div>
      </div>
      <div className="row">
        {milestoneItems}
      </div>
      <div className="row">
        <div className="col-md-12">
          <Link to={'/sprintboard/' + data.repository.full_name}>show issues without a milestone</Link>
        </div>
      </div>
    </div>;
  }
});

module.exports = Milestones;
