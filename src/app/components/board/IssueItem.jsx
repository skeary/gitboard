

const React = require('react');
const $ = require('jquery');
import { Link } from 'react-router';

const Utils = require('../../utils');
const Modal = require('../generic/modal');
const IssueManager = require('../../helpers/issue_manager');

const IssueFooter = require('./IssueFooter');
const IssueDetails = require('./IssueDetails');

var IssueItem = React.createClass({

  showIssueDetails : function(e){
      this.setState({showDetails : true});
      e.preventDefault();
  },

  closeModal : function(e){
      Utils.redirectTo(Utils.makeUrl(this.props.baseUrl,{},this.props.params,['issueId']));
      this.refs.issueDetails.close();
      this.setState({showDetails : false});
  },

  getInitialState : function(){
      return {showDetails : this.props.showDetails || false};
  },

  componentDidUpdate : function(prevProps,prevState){
      if (this.state.showDetails){
          this.refs.issueDetails.open();
      }
  },

  componentDidMount : function(){
      if (this.state.showDetails)
          this.refs.issueDetails.open();
  },

  componentWillReceiveProps : function(props){
      this.setState({showDetails : props.showDetails});
  },

  onDragStart: function(e){
      this.props.dragStart(this.props.issue);
      e.target.style.opacity = 0.5;
  },

  onDragEnd : function(e){
      this.props.dragEnd(this.props.issue);
      e.target.style.opacity = 1.0;
  },

  renderTimeEstimate: function(issue) {
    if (issue.timeEstimate)
      return (<span className="time-estimate">{this.props.issueManager.formatMinutes(issue.timeEstimate)}</span>);
    return null;
  },

  renderTimeSpent: function(issue) {
    if (issue.timeSpent)
      return (<span className="time-spent">{this.props.issueManager.formatMinutes(issue.timeSpent)}</span>);
    else
      return null;
  },

  isSpecialLabel(labelName) {
    const issueCategories = this.props.issueManager.issueCategories;
    const categoryLabels = Object.keys(issueCategories).map(key => issueCategories[key].label);
    if (categoryLabels.indexOf(labelName) != -1) {
      return true;
    }

    if (labelName.startsWith('time-')) {
      return true;
    }
    return false;
  },



  render : function(){
      var assigneeInfo;
      var issue = this.props.issue;
      if (issue.assignee !== undefined && issue.assignee !== null)
          assigneeInfo = <img className="assignee" width="32" height="32" src={issue.assignee.avatar_url+'&s=32'} />;

      var modal;

      if (this.state.showDetails){
          var resize = function(e){
              var maxHeight = $(window).height(); 
              var element = $('.modal-body');
              element.css({overflow:'auto',
                            height:Math.min(maxHeight-100,element[0].scrollHeight+0)+'px'});
          }.bind(this)
          modal = <Modal
              ref="issueDetails"
              cancel="Close"
              raw={true}
              onCancel={this.closeModal}
              onConfirm={this.closeModal}
              title={issue.title}>
                  <div className="modal-body">
                      <IssueDetails issue={issue}
                                    onContentChange={resize}
                                    key={issue.number}
                                    issueManager={this.props.issueManager}
                                    collaborators={this.props.collaborators}
                                    milestones={this.props.milestones}
                                    data={this.props.data}/>
                  </div>
                  <div className="modal-footer">
                      <IssueFooter issue={issue} data={this.props.data}/>
                  </div>
            </Modal>
      }

      return <div className={"panel panel-primary issue-item"+(issue.dragged ? " dragged" : "")}
                  onDragStart={this.onDragStart}
                  onDragEnd={this.onDragEnd}
                  draggable={true}>
        {modal}                 
        <a href="#" onClick={this.showIssueDetails}>
          <div className="panel-heading">
          {issue.labels.filter(label => !this.isSpecialLabel(label.name)).map(
            label => <span key={label.name} className="issue-label" style={{borderBottom:'3px solid '+'#'+label.color}}>{label.name}</span>
          )}
              <p className="right-symbols"><span className="assignee">{assigneeInfo}</span></p>
          </div>
          <div className="panel-body">
              <h5>{issue.title}</h5>
          </div>
          <div className="panel-footer">
              {this.renderTimeEstimate(issue)} {this.renderTimeSpent(issue)} &nbsp;
          </div>
          </a>
      </div>;
  }
});

module.exports = IssueItem;