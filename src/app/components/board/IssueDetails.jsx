const React = require('react');
const Marked = require('marked');

const Utils = require('../../utils');
const LoaderMixin = require('../mixins/loader');
const GithubErrorHandlerMixin = require('../mixins/github_error_handler')

const TimeSelector = require('./TimeSelector');
const CategorySelector = require('./CategorySelector');
const MilestoneSelector = require('./MilestoneSelector');
const AssigneeSelector = require('./AssigneeSelector');

Marked.setOptions({
  sanitize: false,
  gfm: true,
  tables: true,
  pedantic: false,
  breaks: false,
  smartLists: true,
  smartypants: false
});

var IssueDetails = React.createClass({

  mixins: [LoaderMixin, GithubErrorHandlerMixin],

  inlineComponent: true,

  resources: function (props) {
    return [];
  },

  renderRemainingDropdown: function(issue) {
    if (!this.props.showRemaining) {
      return null;
    }
    return (
      <TimeSelector type="remaining" label="Rem."
        issue={issue}
        issueManager={this.props.issueManager}
        onClick={this.props.onContentChange} />
    );
  },

  render: function () {
    var issue = this.props.issue;
    var markdown = <p>(no description given)</p>;
    var assignee;

    if (issue.assignee !== null)
      assignee = [<img width="32" height="32" src={issue.assignee.avatar_url + '&s=32'} />, <span className="label">{issue.assignee.login}</span>];
    var selectors;
    if (Utils.isLoggedIn() || true) {
      selectors = <div className="btn-group btn-group-raised">
        <AssigneeSelector issue={issue}
          onClick={this.props.onContentChange}
          issueManager={this.props.issueManager}
          collaborators={this.props.collaborators} />
        <TimeSelector type="estimate" label="Est."
          issueManager={this.props.issueManager}
          issue={issue}
          onClick={this.props.onContentChange} />
        <TimeSelector type="spent" label="Spent"
          issue={issue}
          issueManager={this.props.issueManager}
          onClick={this.props.onContentChange} />
        {this.renderRemainingDropdown(issue)}
        <CategorySelector issue={issue}
          issueManager={this.props.issueManager}
          onClick={this.props.onContentChange} />
        <MilestoneSelector issue={issue}
          issueManager={this.props.issueManager}
          milestones={this.props.milestones}
          onClick={this.props.onContentChange} />
      </div>;
    }
    try {
      var markdownText = '(no description given)';
      if (issue.body)
        markdownText = Marked(issue.body);
      markdown = <div key={issue.id} dangerouslySetInnerHTML={{ __html: markdownText }}></div>;
      return markdown;
    }
    catch (err) {
      markdown = <div>
        <p>An error occured when trying to render the Markdown, sorry... Displaying RAW text instead.</p>
        <p>
          {issue.body}
        </p>
      </div>;
    }
    finally {
      return <div className="issue-details">
        {selectors}
        {markdown}
      </div>;
    }
  }
});

module.exports = IssueDetails;