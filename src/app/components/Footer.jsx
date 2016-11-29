const React = require('react');


var Footer = React.createClass({
  render: function () {
    return (
      <footer className="footer navbar-fixed-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
                <p className="text-muted">
                    Made by <a href="http://www.andreas-dewes.de/en">Andreas Dewes</a> // 
                    <a href="https://github.com/adewes/gitboard">Github</a> //
                    <a href="http://twitter.com/japh44" target="_blank">Twitter</a>
                </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;