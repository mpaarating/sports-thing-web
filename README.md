# Sports Thing
## A statistical tool

[![Tag](https://img.shields.io/github/tag/mpaarating/sports-thing.svg?style=flat)](https://github.com/mpaarating/sports-thing)

## Summary

Frontend consisting of:
- [Angular](https://angularjs.org/) Using paradox41's excellent [angular template](https://github.com/paradox41/app-template)
- [Bootstrap](http://getbootstrap.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)
- [Karma](https://karma-runner.github.io/)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)

Backend consisting of:
 - [Express](http://expressjs.com/)
 - [Mongodb](https://www.mongodb.org/)
 - [Conventional Changelog](https://github.com/ajoslin/conventional-changelog)

## Usage

Clone the repo or download the zip file. If you cloned, `rm -rf .git`

1. `npm install`

### For client

1. `cd client/`
2. `gulp`

### For API
1. `cd api/`
2. `node server.js`

## Build

1. `npm run build`

## Style

### Client JavaScript
- Each module should be totally self-contained. Any functionality shared across modules should be moved into `common/`.
- Modules can have their own directives, services, filters, etc. If multiple files are needed in order to maintain file size,
a folder should be created (`directives/`, `services/`, etc) and the broken up files should be placed into their respective folders
with less abstract naming conventions.
- JavaScript files should always be as close as possible - preferably on the same level - as their HTML partials.
- If a directive has a partial - which they tend to - a new folder should be created that is named accordingly (meaning not something generic)
and the HTML partial and the JavaScript file should be placed together in that folder.

### Sass
- `app.scss` is merely a table of contents. There should be no Sass in the file.
- Each module is responsible for exporting its submodules. In other words, `app.scss` should only import top level modules.
- Sass that needs to be shared among modules should be moved into `assets/stylesheets/`.

### Modules

A typical module will look something like this:

```javascript
import angular from 'angular';

import _ from 'lodash';

class ExampleCtrl {
    constructor(data) {
        this.exampleData = data;
    }

    someMethod() {
        return _.map(this.exampleData, function(data) {
            return (data * 2);
        });
    }

    get data() {
        return this.exampleData;
    }
}

ExampleCtrl.$inject = ['data'];

/*
    Allows us to import exampleModule like so:

    import exampleModule from './example';

    angular.module('foo', [
        exampleModule.name
    ])  
*/
export default angular.module('example', [])

.controller('ExampleCtrl', ExampleCtrl)

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('app.example', {
        controller: 'ExampleCtrl',
        controllerAs: 'Example',
        url: '/example',
        template: require('./_example.html'),
        resolve: {
            data: [function() {
                return [1, 2, 3, 4, 5, 6];
            }]
        }
    });
}]);
```

### Commit Conventions

Follow [conventional changelog](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)

### Documentation

Documentation via [JSDoc](http://usejsdoc.org/)

1. `npm run docs`
2. `gulp documentation:serve`
