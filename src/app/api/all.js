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

const AuthorizationApi = require('./github/authorization');
const UserApi = require('./github/user');
const IssueApi = require('./github/issue');
const RepositoryApi = require('./github/repository');
const MilestoneApi = require('./github/milestone');
const OrganizationApi = require('./github/organization');
const LabelApi = require('./github/label');
const BoardConfigApi = require('./github/board_config');

module.exports = {
  authorization : AuthorizationApi.getInstance(),
  user : UserApi.getInstance(),
  issue : IssueApi.getInstance(),
  repository : RepositoryApi.getInstance(),
  milestone : MilestoneApi.getInstance(),
  organization : OrganizationApi.getInstance(),
  label : LabelApi.getInstance(),
  boardConfig : BoardConfigApi.getInstance()
};
