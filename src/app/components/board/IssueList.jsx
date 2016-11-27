
const React = require('react');

const IssueItem = require('./IssueItem');
const RemainingIssueProgressTracker = require('./RemainingIssueProgressTracker');


var IssueList = React.createClass({

  onDragEnter: function (e) {
    this.props.dragEnter();
  },

  onDragLeave: function (e) {
    if (this.props.dragLeave)
      this.props.dragLeave();
  },

  renderIssueItems: function() {
    if (this.props.issues.length === 0) {
      return (
        <div className="panel panel-default">
          <div className="panel-body">
            <i>No issues found.</i>
          </div>
        </div>
      );
    } else {
      return (
        <div>
            {this.props.issues.map(issue => {
              return <IssueItem
                key={issue.number}
                issue={issue}
                collaborators={this.props.collaborators}
                issueManager={this.props.issueManager}
                milestones={this.props.milestones}
                dragStart={this.props.dragStart}
                dragged={issue.id == (this.props.draggedIssue && this.props.draggedIssue.id == issue.id ? true : false)}
                dragEnd={this.props.dragEnd}
                showRemaining={this.props.boardConfig.timeTracking.remaining.include} />
            })}
        </div>
      )
    }
  },


  formatMinutes: function (minutes) {
    if (minutes < 60)
      return minutes + 'm';
    else if (minutes < 8 * 60) {
      var hours = Math.floor(minutes / 60);
      var minutes = minutes % 60;
      var str = hours + 'h';
      if (minutes)
        str += ' ' + minutes + 'm';
      return str;
    }
    var days = Math.floor(minutes / 60 / 8);
    var hours = Math.floor((minutes % (60 * 8)) / 60);
    var minutes = minutes % 60;
    str = days + 'd';
    if (hours)
      str += ' ' + hours + 'h';
    if (minutes)
      str += ' ' + minutes + 'm';
    return str;
  },
  
  renderEstimateTotals: function() {
    let timeEstimate = 0;
    let timeSpent = 0;
    let timeRemaining = 0;

    for (let issue of this.props.issues) {
      if (!issue.placeholder) {

        let issueTime 
        timeEstimate += issue.timeEstimate ? issue.timeEstimate : 0;        
        timeSpent += issue.timeSpent ? issue.timeSpent : 0;
        timeRemaining += issue.timeRemaining ? issue.timeRemaining : (issue.timeEstimate - issue.timeSpent); 
      }
    }

    return (
      <RemainingIssueProgressTracker
        timeEstimate={timeEstimate} timeSpent={timeSpent} timeRemaining={timeRemaining}
        showRemaining={this.props.boardConfig.timeTracking.remaining.include} />
    );
  },

  render: function () {
    return <div className={"col-md-3 issue-list" + (this.props.active ? ' active' : '')}
      onDragLeave={this.onDragLeave}
      onDragEnter={this.onDragEnter}>
      <h4>{this.props.title}</h4>
      {this.renderEstimateTotals()}
      {this.renderIssueItems()}
    </div>;
  }
});
module.exports = IssueList;