const React = require('react');

import { Link } from "react-router";

const Menu = require('./Menu');

var Navbar = React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top navbar-gitboard" role="navigation">
        <div className="container">
          <div id="nav-head" className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
              <Link className="navbar-brand" to="/">
                <img style={{float: "left", marginRight: "5px"}} src={require("../../../public/images/homepage/logo.svg")} height="32"/>
                Gitboard
              </Link>
          </div>

          <Menu />
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;