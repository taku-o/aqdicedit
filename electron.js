'use strict';
exports.__esModule = true;
var electron_1 = require("electron");
var _log, log = function () { _log = _log || require('electron-log'); return _log; };
var Menu = require("./electron-menu");
var Pane = require("./electron-window");
var Launch = require("./electron-launch");
// AqDicEdit application
var AqDicEdit = function () {
    this.launchArgs = null;
    this.dictWindow = null;
};
var myApp = new AqDicEdit();
AqDicEdit.prototype.showDictWindow = Pane.showDictWindow;
AqDicEdit.prototype.showAboutWindow = Pane.showAboutWindow;
AqDicEdit.prototype.initAppMenu = Menu.initAppMenu;
AqDicEdit.prototype.initDockMenu = Menu.initDockMenu;
AqDicEdit.prototype.handleOpenUrl = Launch.handleOpenUrl;
// handle uncaughtException
process.on('uncaughtException', function (err) {
    log().error('electron:event:uncaughtException');
    log().error(err);
    log().error(err.stack);
    electron_1.app.quit();
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
// receive protocol call
electron_1.app.on('will-finish-launching', function () {
    electron_1.app.on('open-url', function (event, url) {
        event.preventDefault();
        myApp.handleOpenUrl(url);
    });
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
electron_1.app.on('ready', function () {
    // open dict window.
    myApp.showDictWindow();
    // init menu
    myApp.initAppMenu({ isDebug: (process.env.DEBUG != null) });
    myApp.initDockMenu();
});
// resetWindowPosition
function resetWindowPosition() {
    myApp.dictWindow.center();
}
AqDicEdit.prototype.resetWindowPosition = resetWindowPosition;
// switchAlwaysOnTop
function switchAlwaysOnTop() {
    var newflg = !myApp.dictWindow.isAlwaysOnTop();
    myApp.dictWindow.setAlwaysOnTop(newflg);
    myApp.dictWindow.webContents.send('switchAlwaysOnTop', newflg);
}
electron_1.ipcMain.on('switchAlwaysOnTop', function (event, message) {
    var newflg = !myApp.dictWindow.isAlwaysOnTop();
    myApp.dictWindow.setAlwaysOnTop(newflg);
    event.sender.send('switchAlwaysOnTop', newflg);
});
AqDicEdit.prototype.switchAlwaysOnTop = switchAlwaysOnTop;
