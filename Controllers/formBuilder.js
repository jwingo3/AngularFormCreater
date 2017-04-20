var Angular = require('angular');

module.exports = 'dragular.controller.formBuilder';

Angular.module(module.exports, [
  require('../services/form.js'),

])

.directive('modalDialog', function() {
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
})



.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}])

.controller('FormController', ['$location', '$scope','formService',  function($location, $scope, formService) {
    var form = this;

    var init = function() {
          form.elementCount = 0;

          form.formService.init();
      };


      $scope.buttonData ={
          type:'button',
          label: '',

          text: 'test',
          width: '80%',
          height: '100%',
          fontSizeText:"",
          fontSizeLabel:"",

          create: true
      };
      $scope.textData ={
          type:'text',
          text: 'test',
          label: '',
          width: '80%',
          height: '100%',
          fontSizeLabel:"",
          fontSizeText:"",

          create: true

      };
      $scope.labelData ={
          type:'label',
          text: 'test',
          label: '',
          width: '80%',
          height: '100%',
          fontSizeLabel:"",
          fontSizeText:"",
          create: true
      };
      $scope.dropDownData ={
            type:'dropDown',
            dropDownResult: '',
            label: '',

            dropDownText: ['hi','hello','something','dset'],
            width: '80%',
            height: '100%',
            fontSizeLabel:"",
          //  fontSizeText:"",
            create: true
        };
      $scope.textAreaData ={
              type:'textArea',
              label: '',
              text: "",
              width: '80%',
              height: '100%',
              fontSizeText:"",
              fontSizeLabel:"",

              rows:4,
              cols: 40,
              create: true
      };
      $scope.checkBoxData ={
            type:'checkBox',
            label: '',
            text: '',
            fontSizeLabel:"",
        //    fontSizeText:"",
          //  width: '100%',
          //  height: '100%',
            checked: false,
            create: true
      };


    form.formService = formService;

    init();




    //dialog box code
    $scope.modalShown = false;
    $scope.toggleModal = function(settingsLocation) {
      //if opening
      $scope.modalShown = !$scope.modalShown;

      $scope.elementArray = {};

      if  ($scope.modalShown == true){
        $scope.settingsLocation = settingsLocation;
        $scope.elementArray = formService.elementArray[settingsLocation];
        var workingElement = settingsLocation;

      }else{
        console.log('closed');
      }

    };

    //print object
    $scope.showJSON = false;
    $scope.toggleJSON = function() {
      //if opening
      $scope.showJSON = !$scope.showJSON;

      if  ($scope.showJSON == true){
        console.log(JSON.stringify(formService.elementArray, null, 2)  );
        $scope.currentJSON = JSON.stringify(formService.elementArray, null, 2);

      }else{
        console.log('closed JSON');
      }

    };

    function isNumberKey(evt){
      var charCode = (evt.which) ? evt.which : event.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
      return true;
  }



}])

;
