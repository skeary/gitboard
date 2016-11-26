
const React = require('react');

var Dropdown = React.createClass({

    render :function(){
        var lis = React.Children.map(this.props.children,function(child,i){
            if (child == undefined)
                return <li role="separator" className="divider" key={i} />;
            return <li key={i}>{child}</li>;
        });
        if (this.props.disabled)
            return <div className="btn-group">
            <a href="#" onClick={function(e){e.preventDefault();}} className="btn btn-xs btn-default dropdown-toggle">{this.props.title}</a>
        </div>
        else
        return <div className="btn-group">
            <a key="dropdown-link" onClick={this.props.onClick} href="#" className="btn btn-xs btn-default dropdown-toggle" data-target="#" data-toggle="dropdown">{this.props.title}&nbsp;<i key="caret-down" className="fa fa-caret-down" /></a>
            <ul className="dropdown-menu">
                {lis}
            </ul>
        </div>
    }
});