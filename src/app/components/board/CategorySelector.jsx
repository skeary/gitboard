const React = require('react');
const Dropdown = require('./Dropdown');
const Utils = require('../../utils');

import { MenuItem } from 'react-bootstrap';

var CategorySelector = React.createClass({

    render : function(){

        var categoryData = this.props.issueManager.issueCategories;

        var setCategory = function(category,event){
            event.preventDefault();
            this.props.issueManager.moveTo(this.props.issue,category);
        }.bind(this);

        var category = Object.keys(categoryData)[0];
        for (var cat in categoryData){
            if (this.props.issueManager.isMemberOf(this.props.issue,cat)){
                category = cat;
                break;
            }
        }

        var categoryLinks = Object.keys(categoryData).map(function(key){
            var params = categoryData[key];
            return <MenuItem key={key} href="#" onClick={setCategory.bind(this,key)}>{params.title}</MenuItem>;
        });
        return <Dropdown disabled={!Utils.isLoggedIn()} onClick={this.props.onClick} title={categoryData[category].title}>
            {categoryLinks}
        </Dropdown>;
    }
});

module.exports = CategorySelector;