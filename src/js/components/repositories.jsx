/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

define(["react",
        "js/utils",
        "js/components/mixins/loader",
        "jquery"
        ],
        function (React,Utils,LoaderMixin,$) {
        'use'+' strict';

        var Repositories = React.createClass({

            mixins : [LoaderMixin],

            resources : function(props,state){
                r = [{
                        name : 'user',
                        endpoint : this.apis.user.getProfile,
                        success : function(data,xhr){
                            this.setState({user : data});
                        }.bind(this),
                    }];
                if (state.user !== undefined || props.data.organizationId !== undefined)
                    r.push({
                            name : 'repositories',
                            endpoint : props.data.organizationId !== undefined ? this.apis.organization.getRepositories : this.apis.user.getRepositories,
                            params : [props.data.organizationId || state.user.login,{per_page : 100}],
                            success : function(data,xhr){

                                var repos_array = [];
                                for(var i in data) {
                                    if(data.hasOwnProperty(i) && !isNaN(+i)) {
                                        repos_array[+i] = data[i];
                                    }
                                }
                                this.setState({repositories : repos_array});
                            }.bind(this)
                        });
                return r;
            },

            displayName: 'Repositories',

            render: function () {
                var repositoryItems = this.state.repositories.map(function(repository){
                    return <li><a href={"#/milestones/"+repository.full_name}>{repository.full_name}</a></li>;
                }.bind(this))

                return <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                        <h3>Your repositories</h3>
                        <ul>
                            {repositoryItems}
                        </ul>
                        </div>
                        <div className="col-md-3">
                        <h3>Doing</h3>
                        </div>
                    </div>
                </div>;
            }
        });

        return Repositories;
});
