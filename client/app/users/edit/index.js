/**
 * @module users.edit
 */
import angular from 'angular';
import 'angular-ui-router';

import commonApi from 'common/api';

import states from './states.json';

const STATE = 'app.users.edit';

class UsersEditCtrl {
  constructor(UserResource, user) {
    this.UserResource = UserResource;

    this.user = user;
    this.states = states;
  }

  save() {
    let result;

    if (this.user.id) {
      result = this.UserResource.create(this.user);
    } else {
      result = this.UserResource.update(this.user.id, this.user);
    }

    result.then(() => {
      console.log('saved');
    });
  }
}

UsersEditCtrl.$inject = [
    'UserResource',
    'user'
];

export default angular.module('users.edit', [
    commonApi.name
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state(STATE, {
    controller: 'UsersEditCtrl',
    controllerAs: 'UsersEdit',
    url: '/edit/:id',
    template: require('./_edit.html'),
    resolve: {
      user: ['UserResource', '$stateParams',
          function(UserResource, $stateParams) {
            return UserResource.get($stateParams.id);
          }
        ]
    }
  });
}])

.controller('UsersEditCtrl', UsersEditCtrl);
