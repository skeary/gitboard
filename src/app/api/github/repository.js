/*
Copyright (c) 2015 - Andreas Dewes

This file is part of Gitboard.

Gitboard is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

const Utils = require('../../utils');
const Subject = require('../../subject');
const Settings = require('../../settings');


var RepositoryApi = function (type) {
  Subject.Subject.call(this);
};

var instance;

function getInstance() {
  if (instance === undefined)
    instance = new RepositoryApi();
  return instance;
}

RepositoryApi.prototype = new Subject.Subject();
RepositoryApi.prototype.constructor = RepositoryApi;

RepositoryApi.prototype.getDetails = function (fullName, data, onSuccess, onError) {
  return Utils.apiRequest({
    type: 'GET',
    url: "/repos/" + fullName + '?' + Utils.toUrlParams(data),
    success: onSuccess,
    error: onError,
  }, {});
}

RepositoryApi.prototype.getCollaborators = function (fullName, data, onSuccess, onError) {
  return Utils.apiRequest({
    type: 'GET',
    url: "/repos/" + fullName + '/collaborators?' + Utils.toUrlParams(data),
    success: onSuccess,
    error: onError,
  }, {});
}

module.exports = { getInstance: getInstance };
