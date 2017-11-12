import React from 'react';

import FaBullhorn from 'react-icons/lib/fa/bullhorn';
import MdClose from 'react-icons/lib/fa/close';

export default class NewsToast extends React.Component {
  constructor(props) {
    super(props);

    let name = this.constructor.name;
    let localState = JSON.parse(localStorage.getItem(`${name}.state`));

    this.state = localState || {
      news: [],
      lastId: 0,
    };

    window.__twttr_callbacks = this.handleTwitterCallback.bind(this);
    let script = document.createElement('script');
    script.src = 'https://cdn.syndication.twimg.com/timeline/profile?callback=__twttr_callbacks&screen_name=denpaio';
    document.body.appendChild(script);
  }

  componentDidUpdate() {
    let name = this.constructor.name;
    localStorage.setItem(`${name}.state`, JSON.stringify(this.state));
  }

  handleTwitterCallback(data) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data.body, 'text/html');
    let news = [...doc.querySelectorAll('.timeline-Tweet')].map(function(el) {
      return {
        id: el.dataset.tweetId,
        text: el.querySelector('.timeline-Tweet-Text').innerText,
      };
    });
    this.setState({ news });
  }

  handleDismissButton() {
    let lastId = this.state.news[0].id;
    this.setState({ lastId });
  }

  content() {
    let self = this;
    let lastId = this.state.lastId;

    if (!Array.isArray(this.state.news))
      return null;

    return this.state.news.filter(el => el.id > lastId).map(function(el) {
      return (
        <li key={el.id}>
          <FaBullhorn
            style={listPrefixStyle}
          />
          {el.text}
          <MdClose
            onClick={self.handleDismissButton.bind(self)}
            style={dismissButtonStyle}
          />
        </li>
      );
    })[0];
  }

  render() {
    let content = this.content();

    if (!content)
      return null;

    return (
      <div>
        <ul
          style={listStyle}>
          {content}
        </ul>
      </div>
    );
  }
}

const listStyle = {
  margin: 0,
  padding: '.5em .5em',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  listStyle: 'none',
};

const listPrefixStyle = {
  margin: '0 .5em',
};

const dismissButtonStyle = {
  float: 'right',
  cursor: 'pointer',
};
