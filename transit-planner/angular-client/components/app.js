angular.module('app')
.controller('AppCtrl', function() {
  this.view = 'lines';
  this.changeView = (option) => {
    this.view = option;
  };
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});
