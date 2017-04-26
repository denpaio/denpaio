App.danmakuChannel = App.cable.subscriptions.create({ channel: 'DanmakuChannel' }, {
  received: function(data) {
    let speed = data.speed || 1.0;
    let duration = Math.floor(window.innerWidth / 150 / speed); // 150px/s

    let danmaku = document.createElement('div');
    danmaku.classList.add('danmaku');
    danmaku.innerText = data.message;
    danmaku.style.top = data.top;
    danmaku.style.transition = `transform ${duration}s linear`;
    danmaku.addEventListener(whichTransitionEvent(), (event) => event.target.remove());
    document.getElementsByClassName('container')[0].append(danmaku);
    danmaku.clientHeight; // Force rendering
    danmaku.style.transform = 'translateX(-100%)';
  }
});

/* From Modernizr */
function whichTransitionEvent(){
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}
