
const React = require('react');
import { DropdownButton } from 'react-bootstrap';

var Dropdown = React.createClass({

    render :function(){

        if (this.props.disabled) {
            return (
              <div className="btn-group">
                <a href="#" onClick={function(e){e.preventDefault();}} className="btn btn-xs btn-default dropdown-toggle">{this.props.title}</a>
              </div>
            );
        } else {
          return (
            <DropdownButton bsSize="xsmall" bsStyle="link" title={this.props.title} onSelect={this.props.onClick}>
              {this.props.children}
            </DropdownButton>
          );
        }
    }
});

module.exports = Dropdown;