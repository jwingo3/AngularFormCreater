var Angular = require('angular');

module.exports = 'dragular.controller.formService';

Angular.module(module.exports, [])

.factory('formService', ['$document', '$q', function($document, $q) {
    var formService = {};
    formService.elementArray = [{}];
    var formData = this;




    formService.move = function (old_index, new_index) {

       if (new_index > old_index) {
         var tmp = formService.elementArray[old_index];
         formService.elementArray.splice(old_index, 1);
         formService.elementArray.splice(new_index, 0, tmp);
       }else{
         var tmp = formService.elementArray[old_index];
         formService.elementArray.splice(old_index, 1);
         formService.elementArray.splice(new_index+1, 0, tmp);
       }

      return formService.elementArray; // for testing purposes

    }




    formService.init = function() {

        formService.elementArray = [{

        }];

        return formService.elementArray;
    };

    formService.shuffle = function() {
        return formService.pieces;
    };

    formService.posToIndex = function(posX, posY) {
        var pos = Angular.isObject(posX) ? posX : {
            x: posX,
            y: posY,
        };

        return pos.y * formService.grid + pos.x;
    };

    formService.indexToPos = function(idx) {
        var x = idx % formService.grid;
        var y = Math.floor(idx / formService.grid);

        return {
            x: x,
            y: y
        };
    };

    formService.isAdjacent = function(idxA, idxB) {
        return (Math.floor(idxA / formService.grid) === Math.floor(idxB / formService.grid) && Math.abs(idxA - idxB) === 1) || Math.abs(idxA - idxB) === formService.grid;
    };

    formService.swap = function(idxA, idxB) {

        var tmp = formService.elementArray[idxA];

        formService.elementArray[idxA] = formService.elementArray[idxB];
        formService.elementArray[idxB] = tmp;

        return true;
    };

    formService.createElement = function(inputData) {
        formService.elementArray.push(new createFormElement(inputData));
        console.log(inputData.type);

        return formService.elementArray;
    };

    //create element and insert at insertLocation
    formService.createElementDown = function(inputData,insertLocation) {
        formService.elementArray.splice(insertLocation+1,0, new createFormElement(inputData));

        return formService.elementArray;
    };
    formService.createElementUp = function(inputData,insertLocation) {
        formService.elementArray.splice(insertLocation,0, new createFormElement(inputData));

        return formService.elementArray;
    };

      formService.insertUp = function(inputData, idxA, idxB) {
        //moves from A to B
        console.log('Up Insert');
        console.log('from: indxA ' + idxA);
        console.log('to: indxB ' + idxB);



        if(inputData.create == true){
          console.log('up-create');
          formService.createElementDown(inputData,idxB-1);

        }else{
          formService.move(idxA,idxB-1);

          //var tmp = formService.elementArray[idxA];
          //formService.elementArray.splice(idxA, 1);
          //formService.elementArray.splice(idxB, 0, tmp);
        }



        return formService.elementArray

      };

      //Insert Down
      formService.insertDown = function(inputData,idxA,idxB) {

          //moves from A to B
          console.log('DownInsert');
          console.log('from: indxA ' + idxA);
          console.log('to: indxB '+ idxB);


          if(inputData.create == true){
            console.log('DownInsert-create');
            formService.createElementDown(inputData,idxB);

          }else{
            formService.move(idxA,idxB);

            //var tmp = formService.elementArray[idxA];
            //formService.elementArray.splice(idxA, 1);
            //formService.elementArray.splice(idxB+1, 0, tmp);
          }



          return formService.elementArray

      };

      formService.centerDrop = function(inputData){
        //check to see if there is anything there

        //if empty than drop

        //if not empty than swap

      }

      formService.emptyDrop = function(inputData) {


          formService.elementArray.splice(0,1,new createFormElement(inputData));

          return formService.elementArray;
      };

      function createFormElement(inputData){

        for (var key in inputData) {
            if (inputData.hasOwnProperty(key) && key != "create") {
                if(key == 'dropDownText'){
                  this[key] = inputData[key].slice();
                  console.log(key + " -> " + inputData[key]);

                }else{
                  this[key] = inputData[key];
                  console.log(key + " -> " + inputData[key]);
                }
            }
        }



       }




    return formService;

}])

;
