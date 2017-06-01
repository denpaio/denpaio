// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require cable
//= require visualizer
//= require_tree ./channels
//= require_tree .

Object.assign(Number.prototype, {
  toHumanDuration() {
    let minutes = parseInt(this / 60000);
    let seconds = parseInt(this % 60000 / 1000);
    let padSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${padSeconds}`;
  }
});

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

/* From Modernizr */
function whichTransitionEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}
