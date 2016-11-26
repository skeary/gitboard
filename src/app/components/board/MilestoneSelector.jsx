const React = require('react');
const Dropdown = require('./Dropdown');
const Utils = require('../../utils');

var MilestoneSelector = React.createClass({

    render : function(){

        var dropdownContent;

        var setMilestone = function(milestone,event){
            event.preventDefault();
            this.props.issueManager.setMilestone(this.props.issue,milestone);
        }.bind(this);

        if (this.props.milestones){
            var milestoneLinks = this.props.milestones.map(function(milestone){
                return <a key={milestone.number} href="#" onClick={setMilestone.bind(this,milestone)}>{milestone.title}</a>
            }.bind(this));
            milestoneLinks.push(undefined);
            milestoneLinks.push(<a href="#" onClick={setMilestone.bind(this,null)}> <i className="fa fa-trash" />&nbsp;&nbsp;remove milestone</a>);
            dropdownContent = milestoneLinks;
        }

        return <Dropdown disabled={!Utils.isLoggedIn()} onClick={this.props.onClick} title={this.props.issue.milestone ? this.props.issue.milestone.title : 'no milestone'}>
            {dropdownContent}
        </Dropdown>;
    }
});


module.exports = MilestoneSelector;