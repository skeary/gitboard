const React = require('react');

const formatMinutes = require('./formatMinutes')
const TimeBalanceDisplay = require('./TimeBalanceDisplay');

var RemainingIssueProgressTracker = React.createClass({
  render: function () {
    let timeSpent = this.props.timeSpent || 0;
    let timeEstimate = this.props.timeEstimate || 0;
    let timeRemaining = this.props.timeRemaining || timeEstimate - timeSpent;
    return (
      <div className="estimates">
        Est.&nbsp;<b dangerouslySetInnerHTML={formatMinutes(timeEstimate)} />
        {' '}
        Spent&nbsp;<b dangerouslySetInnerHTML={formatMinutes(timeSpent)} />
        {' '}
        Rem.&nbsp;<b dangerouslySetInnerHTML={formatMinutes(timeRemaining)} />

        <TimeBalanceDisplay timeEstimate={this.props.timeEstimate}
          timeRemaining={this.props.timeRemaining} timeSpent={this.props.timeSpent}
          showRemaining={this.props.showRemaining} />
      </div>
    );
  }
});

module.exports = RemainingIssueProgressTracker;