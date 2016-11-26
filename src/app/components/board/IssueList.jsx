
const React = require('react');

var IssueList = React.createClass({

    onDragEnter : function(e){
        this.props.dragEnter();
    },

    onDragLeave : function(e){
        if (this.props.dragLeave)
            this.props.dragLeave();
    },

    render : function(){
        return <div className={"col-md-3 issue-list"+(this.props.active ? ' active' : '')}
                    onDragLeave={this.onDragLeave}
                    onDragEnter={this.onDragEnter}>
            {this.props.children}
        </div>;
    }
});
module.exports = IssueList;