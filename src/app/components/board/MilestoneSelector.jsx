const React = require('react');
const Dropdown = require('./Dropdown');
const Utils = require('../../utils');
import { MenuItem } from 'react-bootstrap';

var MilestoneSelector = React.createClass({

  render: function () {

    var dropdownContent;

    var setMilestone = function (milestone, event) {
      event.preventDefault();
      this.props.issueManager.setMilestone(this.props.issue, milestone);
    }.bind(this);

    if (this.props.milestones) {
      var milestoneLinks = this.props.milestones.map(function (milestone) {
        return <MenuItem key={milestone.number} href="#" onClick={setMilestone.bind(this, milestone)}>{milestone.title}</MenuItem>
      }.bind(this));
      milestoneLinks.push(<MenuItem divider key="divider" />);
      milestoneLinks.push(<MenuItem href="#" key="remove" onClick={setMilestone.bind(this, null)}> <i className="fa fa-trash" />&nbsp;&nbsp;remove milestone</MenuItem>);
      dropdownContent = milestoneLinks;
    }

    return <Dropdown disabled={!Utils.isLoggedIn()} onClick={this.props.onClick}
      title={this.props.issue.milestone ? this.props.issue.milestone.title : 'no milestone'}>
      {dropdownContent}
    </Dropdown>;
  }
});


module.exports = MilestoneSelector;