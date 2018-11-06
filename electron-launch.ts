'use strict';
import {app} from 'electron';
var _url, url = () => { _url = _url || require('url'); return _url; };

function handleOpenUrl(scheme: string): void {
  const myApp = this;
  const parsed = url().parse(scheme, true);
  switch (parsed.host) {
    case 'quit':
      app.quit();
      break;
    case 'open':
    default:
      // open
      break;
  }
}

// exports
export {
  handleOpenUrl,
};
