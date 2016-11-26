const React = require('react');


var IssueFooter = React.createClass({
    render : function(){
        var issue = this.props.issue;
        var labels = issue.labels.map(function(label){
            return <span key={label.name} className="issue-label" style={{borderBottom:'3px solid '+'#'+label.color}}>{label.name}</span>
        });
        return <div>
            <span className="pull-right"><a target="_blank" href={issue.html_url}>#{issue.number}</a></span>
            <span className="issue-labels">{labels}</span>
        </div>
    }
});

module.exports = IssueFooter;