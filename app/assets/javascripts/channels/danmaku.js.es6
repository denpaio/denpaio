window.App.danmakuChannel = window.App.cable.subscriptions.create('DanmakuChannel', {
  received: function(data) {
    let speed = data.speed || 1.0;
    let duration = Math.floor(window.innerWidth / 150 / speed); // 150px/s

    let danmaku = document.createElement('div');
    danmaku.classList.add('danmaku');
    danmaku.innerText = data.message;
    danmaku.style.top = data.top;
    danmaku.style.transition = `transform ${duration}s linear`;
    danmaku.addEventListener(whichTransitionEvent(), (event) => event.target.remove());
    document.getElementsByClassName('container')[0].appendChild(danmaku);
    danmaku.clientHeight; // Force rendering
    danmaku.style.transform = 'translateX(-100%)';

    let danmakuHistoryContainer = document.getElementById('danmaku-history-container');
    let danmakuLogItem = document.createElement('li');
    let danmakuLogWrap = document.createElement('span');

    danmakuLogWrap.innerText = data.message;
    danmakuLogItem.appendChild(danmakuLogWrap);
    danmakuHistoryContainer.appendChild(danmakuLogItem);
    danmakuHistoryContainer.scrollTop = danmakuHistoryContainer.scrollHeight;
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
