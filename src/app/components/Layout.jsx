const React = require('react');

const Navbar = require('./Navbar');
const Header = require('./Header');
const App = require('./App');
const Footer = require('./Footer');


var Layout = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />
        <Header />
        <App children={this.props.children} />
        <Footer />
      </div>
    );
  }
});

module.exports = Layout;