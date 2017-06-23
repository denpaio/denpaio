document.addEventListener('DOMContentLoaded', function() {
  window.App.danmakuChannel = window.App.cable.subscriptions.create('DanmakuChannel', {
    connected: function() {
      window.App.danmakuChannel.send({ action: 'reload' });
    },
    received: function(data) {
      switch (data.action) {
      case 'reload':
        reloadDanmakuHistory(data);
        break;
      case 'create':
        createDanmaku(data);
        break;
      }
    },
  });
});

function reloadDanmakuHistory(data) {
  let objects = data.objects || [];

  clearDanmakuHistory();
  for (let object of objects) {
    addToDanmakuHistory(object);
  }
}

function clearDanmakuHistory() {
  let danmakuHistoryContainer = document.getElementById('danmaku-history-container');

  while (danmakuHistoryContainer.hasChildNodes()) {
    danmakuHistoryContainer.removeChild(danmakuHistoryContainer.lastChild);
  }
}

function addToDanmakuHistory(data) {
  let danmakuHistoryContainer = document.getElementById('danmaku-history-container');
  let danmakuLogItem = document.createElement('li');
  let danmakuLogWrap = document.createElement('span');

  danmakuLogWrap.innerText = data.message;
  danmakuLogItem.appendChild(danmakuLogWrap);
  danmakuHistoryContainer.appendChild(danmakuLogItem);
  danmakuHistoryContainer.scrollTop = danmakuHistoryContainer.scrollHeight;
}

function createDanmaku(data) {
  let speed = data.speed || 1.0;
  let duration = Math.floor(window.innerWidth / 150 / speed); // 150px/s

  if (!window.isDisabledDanmakuMessage) {
    let danmaku = document.createElement('div');
    danmaku.classList.add('danmaku');
    danmaku.innerText = data.message;
    danmaku.style.top = data.top;
    danmaku.style.transition = `transform ${duration}s linear`;
    danmaku.addEventListener(whichTransitionEvent(), (event) => event.target.remove());
    document.getElementsByClassName('container')[0].appendChild(danmaku);
    danmaku.clientHeight; // Force rendering
    danmaku.style.transform = 'translateX(-100%)';
  }

  addToDanmakuHistory(data);
}

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
