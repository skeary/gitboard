const React = require('react');

const formatMinutes = require('./formatMinutes')


var TimeBalanceDisplay = React.createClass({


  render: function () {
    let timeSpent = this.props.timeSpent || 0;
    let timeEstimate = this.props.timeEstimate || 0;
    let timeRemaining = this.props.timeRemaining || timeEstimate - timeSpent;

    if (typeof timeRemaining ==='undefined' || ! this.props.showRemaining) {
      return null;
    }
    let balance = timeEstimate - (timeSpent + timeRemaining);
    if (balance === 0) {
      return null;
    }
    if (balance >= 0) {
      return (
        <span className="label label-success" dangerouslySetInnerHTML={formatMinutes(balance, true)} />
      );
    } else {
      return(
        <span className="label label-danger" dangerouslySetInnerHTML={formatMinutes(balance)} />
      );
    }
  }
});

module.exports = TimeBalanceDisplay;