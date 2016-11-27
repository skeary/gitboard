const React = require('react');


var RemainingIssueProgressTracker = React.createClass({

  formatMinutes: function (minutes, showTrendDown) {
    let str = '';
    if (minutes < 0) {
      str += '<i class="material-icons">trending_up</i>';
      minutes *= -1;
    } else if (showTrendDown) {
      str += '<i class="material-icons">trending_down</i>';      
    }
    if (minutes < 60)
      str += minutes + 'm';
    else if (minutes < 8 * 60) {
      var hours = Math.floor(minutes / 60);
      var minutes = minutes % 60;
      str += hours + 'h';
      if (minutes)
        str += '&nbsp;' + minutes + 'm';
    } else {
      var days = Math.floor(minutes / 60 / 8);
      var hours = Math.floor((minutes % (60 * 8)) / 60);
      var minutes = minutes % 60;
      str += days + 'd';
      if (hours)
        str += '&nbsp;' + hours + 'h';
      if (minutes)
        str += '&nbsp;' + minutes + 'm';
    }
    return { __html: str };
  },

  renderBalance: function (timeEstimate, timeRemaining, timeSpent) {
    if (typeof timeRemaining ==='undefined' || ! this.props.showRemaining) {
      return null;
    }
    let balance = timeEstimate - (timeSpent + timeRemaining);
    if (balance === 0) {
      return null;
    }
    if (balance >= 0) {
      return (
        <span>
          Rem.&nbsp;<b dangerouslySetInnerHTML={this.formatMinutes(timeRemaining)} />
          <span className="label label-success" dangerouslySetInnerHTML={this.formatMinutes(balance, true)} />
        </span>
      );
    } else {
      return(
        <span>
          Rem.&nbsp;<b dangerouslySetInnerHTML={this.formatMinutes(timeRemaining)} />
          <span className="label label-danger" dangerouslySetInnerHTML={this.formatMinutes(balance)} />
        </span>
      );
    }
  },

  render: function () {
    let timeSpent = this.props.timeSpent || 0;
    let timeEstimate = this.props.timeEstimate || 0;
    let timeRemaining = this.props.timeRemaining || timeEstimate - timeSpent;
    return (
      <div className="estimates">
        Est.&nbsp;<b dangerouslySetInnerHTML={this.formatMinutes(timeEstimate)} />
        {' '}
        Spent&nbsp;<b dangerouslySetInnerHTML={this.formatMinutes(timeSpent)} />
        {' '}
        {this.renderBalance(timeEstimate, timeRemaining, timeSpent)}
      </div>
    );
  }
});

module.exports = RemainingIssueProgressTracker;