'use strict';
import {app,BrowserWindow} from 'electron';
var _localShortcut, localShortcut     = () => { _localShortcut = _localShortcut || require('electron-localshortcut'); return _localShortcut; };
var _log, log                         = () => { _log = _log || require('electron-log'); return _log; };
var _path, path                       = () => { _path = _path || require('path'); return _path; };
var _openAboutWindow, openAboutWindow = () => { _openAboutWindow = _openAboutWindow || require('about-window').default; return _openAboutWindow; };

// dict window
function showDictWindow(): void {
  const myApp = this;
  if (this.dictWindow && !this.dictWindow.isDestroyed()) {
    this.dictWindow.show(); this.dictWindow.focus();
    return;
  }

  const {width, height} = {width: 800, height: 800};
  this.dictWindow = new BrowserWindow({
    width: width,
    height: height,
    x: x,
    y: y,
    acceptFirstMouse: true,
    show: false, // show at did-finish-load event
    webPreferences: {
      devTools: (process.env.DEBUG != null)
    },
  });
  this.dictWindow.loadURL(`file://${__dirname}/dict.html`);

  // shortcut
  localShortcut().register(this.dictWindow, 'Command+Q', () => {
    app.quit();
  });
  localShortcut().register(this.dictWindow, 'Command+W', () => {
    // disable c+w
  });
  localShortcut().register(this.dictWindow, 'Command+R', () => {
    // disable c+w
  });

  // window event
  this.dictWindow.webContents.on('did-finish-load', () => {
    myApp.dictWindow.show(); myApp.dictWindow.focus();
  });
  this.dictWindow.on('close', () => {
    // do nothing
  });
  this.dictWindow.on('closed', () => {
    myApp.dictWindow = null;
  });
  this.dictWindow.on('unresponsive', () => {
    log().warn('main:event:unresponsive');
  });
  this.dictWindow.webContents.on('crashed', () => {
    log().error('main:event:crashed');
  });
}

// about application window
function showAboutWindow(): void {
  const w = openAboutWindow()({
    icon_path: path().join(__dirname, 'img/icon_128x128.png'),
    css_path: path().join(__dirname, 'css/about.css'),
    package_json_dir: __dirname,
    open_devtools: false,
  });
  if (this.dictWindow) { w.setParentWindow(this.dictWindow); }
  localShortcut().register(w, 'Command+Q', () => { app.quit(); });
  localShortcut().register(w, 'Command+W', () => { w.close(); });
}

// exports
export {
  showDictWindow,
  showAboutWindow,
};
