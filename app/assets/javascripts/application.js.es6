// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require webpack-bundle
//= require cable
//= require_tree ./channels
//= require_tree .

window.onload = function () {
  function handleHotKeys(event) {
    if (event.eventPhase !== 2)
      return;

    let denpaioApp = document.getElementById('denpaio-app');
    let new_event = new Event(event.type, event);
    new_event.keyCode = event.keyCode;
    new_event.charCode = event.charCode;
    new_event.which = event.which;
    denpaioApp.focus();
    denpaioApp.dispatchEvent(new_event);
  }

  document.body.addEventListener('keydown', handleHotKeys, false);
  document.body.addEventListener('keyup', handleHotKeys, false);
  document.body.addEventListener('keypress', handleHotKeys, false);
};
