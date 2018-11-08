'use strict';
exports.__esModule = true;
var electron_1 = require("electron");
var _localShortcut, localShortcut = function () { _localShortcut = _localShortcut || require('electron-localshortcut'); return _localShortcut; };
var _log, log = function () { _log = _log || require('electron-log'); return _log; };
var _path, path = function () { _path = _path || require('path'); return _path; };
var _openAboutWindow, openAboutWindow = function () { _openAboutWindow = _openAboutWindow || require('about-window')["default"]; return _openAboutWindow; };
// dict window
function showDictWindow() {
    var myApp = this;
    if (this.dictWindow && !this.dictWindow.isDestroyed()) {
        this.dictWindow.show();
        this.dictWindow.focus();
        return;
    }
    var _a = { width: 800, height: 800 }, width = _a.width, height = _a.height;
    this.dictWindow = new electron_1.BrowserWindow({
        width: width,
        height: height,
        acceptFirstMouse: true,
        show: false,
        webPreferences: {
            devTools: (process.env.DEBUG != null)
        }
    });
    this.dictWindow.loadURL("file://" + __dirname + "/dict.html");
    // shortcut
    localShortcut().register(this.dictWindow, 'Command+Q', function () {
        electron_1.app.quit();
    });
    localShortcut().register(this.dictWindow, 'Command+W', function () {
        // disable c+w
    });
    // window event
    this.dictWindow.webContents.on('did-finish-load', function () {
        myApp.dictWindow.show();
        myApp.dictWindow.focus();
    });
    this.dictWindow.on('close', function () {
        // do nothing
    });
    this.dictWindow.on('closed', function () {
        myApp.dictWindow = null;
    });
    this.dictWindow.on('unresponsive', function () {
        log().warn('main:event:unresponsive');
    });
    this.dictWindow.webContents.on('crashed', function () {
        log().error('main:event:crashed');
    });
}
exports.showDictWindow = showDictWindow;
// about application window
function showAboutWindow() {
    var w = openAboutWindow()({
        icon_path: path().join(__dirname, 'img/icon_128x128.png'),
        css_path: path().join(__dirname, 'css/about.css'),
        package_json_dir: __dirname,
        open_devtools: false
    });
    if (this.dictWindow) {
        w.setParentWindow(this.dictWindow);
    }
    localShortcut().register(w, 'Command+Q', function () { electron_1.app.quit(); });
    localShortcut().register(w, 'Command+W', function () { w.close(); });
}
exports.showAboutWindow = showAboutWindow;
