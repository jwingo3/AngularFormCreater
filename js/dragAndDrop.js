require("../dragular.css");
require("../sidemenu.css");

var Angular = require("angular");

Angular.module("myApp", [
    require("angular-drag-drop"),
    require("../Controllers/formBuilder.js"),
    require("../Controllers/openDialogBox.js"),

]);
