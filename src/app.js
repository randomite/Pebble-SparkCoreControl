var ajax = require('ajax');
var UI = require('ui');

var DEVICE_ID = window.localStorage.getItem('deviceID');
var TOKEN = window.localStorage.getItem('token');
var FUNCTION_NAME = window.localStorage.getItem('functionName');

var mainBody = checkIfNull();

var main = new UI.Card({
  title: 'Spark Core Controller',
  body: mainBody,
  style: 'small',
  scrollable: true,
  fullscreen: true
  //icon: 'images/menu_icon.png'
});

main.show();

var initialized = false;

Pebble.addEventListener("ready", function() {
  console.log("ready called!");
  initialized = true;
});

Pebble.addEventListener("showConfiguration", function() {
  console.log("showing configuration");
  Pebble.openURL('http://www.ravinsardal.me/pebble/sparkcorecontrol/index.html');
});

Pebble.addEventListener("webviewclosed", function(e) {
  console.log("configuration closed");
  // webview closed
  var options = JSON.parse(decodeURIComponent(e.response));
  console.log("Options = " + JSON.stringify(options));
  
  window.localStorage.setItem('deviceID', options.deviceID);
  window.localStorage.setItem('token', options.token);
  window.localStorage.setItem('functionName', options.functionName);
  
  DEVICE_ID = window.localStorage.getItem('deviceID');
  TOKEN = window.localStorage.getItem('token');
  FUNCTION_NAME = window.localStorage.getItem('functionName');
  
  updateBody();
  
});

function updateBody(){
  main.body(checkIfNull());
  main.show();
}

function checkIfNull(){
  
  DEVICE_ID = window.localStorage.getItem('deviceID');
  
  TOKEN = window.localStorage.getItem('token');
  
  FUNCTION_NAME = window.localStorage.getItem('functionName');
  
  //do a check on local storage if device ID is there
  
  if(DEVICE_ID === null || TOKEN === null || FUNCTION_NAME === null){
    return 'Enter device ID, token and function name in app settings.';
  }else {
    return 'Press select/middle button to execute your function!!\n Device ID: \n'+ DEVICE_ID + '\n Function Name: \n' + FUNCTION_NAME ;
  }
}


main.on('click', 'select', function(e) {
  var userUrl = '';
  userUrl = 'http://www.ravinsardal.me/pebble/sparkcorecontrol/h.php?token='+TOKEN+'&id='+DEVICE_ID +'&function='+ FUNCTION_NAME + '';
  userUrl = userUrl.toString();
  console.log("open request sent");
  ajax({ url: userUrl});
  console.log("open request completed");
});
