const React = require('react');
const Dropdown = require('./Dropdown');
const Utils = require('../../utils');

import { MenuItem } from 'react-bootstrap';

var TimeSelector = React.createClass({
  render: function () {
    var choices = {
      '5m': '5 minutes',
      '10m': '10 minutes',
      '30m': '30 minutes',
      '1h': '1 hour',
      '2h': '2 hours',
      '3h': '3 hours',
      '4h': '4 hours',
      '6h': '6 hours',
      '8h': '1 day (8 hours)',
      '16h': '2 days',
      '24h': '3 days',
      '32h': '4 days',
      '40h': '5 days',
      '80h': '10 days'
    };

    var setTime = function (time, event) {
      event.preventDefault();
      this.props.issueManager.setTime(this.props.issue, time, this.props.type);
    }.bind(this);


    var timeLinks = Object.keys(choices).map(function (key) {
      var title = choices[key];
      return <MenuItem key={key} href="#" onClick={setTime.bind(this, key)}>{title}</MenuItem>;
    });

    timeLinks.push(<MenuItem divider key="divider" />);
    timeLinks.push(<MenuItem href="#" key="remove" onClick={setTime.bind(this, undefined)}> <i className="fa fa-trash" />&nbsp;&nbsp;remove time</MenuItem>);
    var minutes = this.props.issue[`time${this.props.type.charAt(0).toUpperCase()}${this.props.type.slice(1)}`];
    var minutesStr = 'n/a';
    if (minutes)
      minutesStr = this.props.issueManager.formatMinutes(minutes)
    var title = <span key="main-title">{this.props.label} {minutesStr}</span>

    return <Dropdown disabled={!Utils.isLoggedIn()} onClick={this.props.onClick} title={title}>
      {timeLinks}
    </Dropdown>;
  }
});

module.exports = TimeSelector;