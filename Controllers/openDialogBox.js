var Angular = require('angular');

module.exports = 'dragular.controller.OpenDialogBox';

Angular.module(module.exports, [

])

.directive('modalDialog1', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X </div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"

  };
}).controller('OpenDialogBox', ['$scope','formService' ,function($scope, formService) {
  $scope.modalShown = false;
  $scope.toggleModal = function(settingsLocation) {
    //if opening
    $scope.modalShown = !$scope.modalShown;

     $scope.elementArray = {};

    if  ($scope.modalShown == true){
      $scope.settingsLocation = settingsLocation;
      $scope.elementArray = formService.elementArray[settingsLocation];
      var workingElement = settingsLocation;
      console.log($scope.elementArray.text);
    }else{
      console.log('closed');
    }

  };
}]);
