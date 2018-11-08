'use strict';
import {app, ipcMain} from 'electron';
var _log, log = () => { _log = _log || require('electron-log'); return _log; };
import * as Menu from './electron-menu';
import * as Pane from './electron-window';
import * as Launch from './electron-launch';

// AqDicEdit application
const AqDicEdit = function(): void {
  this.launchArgs = null;
  this.dictWindow = null;
};
const myApp = new AqDicEdit() as yubo.IAqDicEdit;
AqDicEdit.prototype.showDictWindow = Pane.showDictWindow;
AqDicEdit.prototype.showAboutWindow = Pane.showAboutWindow;
AqDicEdit.prototype.initAppMenu = Menu.initAppMenu;
AqDicEdit.prototype.initDockMenu = Menu.initDockMenu;
AqDicEdit.prototype.handleOpenUrl = Launch.handleOpenUrl;

// handle uncaughtException
process.on('uncaughtException', (err: Error) => {
  log().error('electron:event:uncaughtException');
  log().error(err);
  log().error(err.stack);
  app.quit();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

// receive protocol call
app.on('will-finish-launching', () => {
  app.on('open-url', (event, url: string) => {
    event.preventDefault();
    myApp.handleOpenUrl(url);
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // open dict window.
  myApp.showDictWindow();

  // init menu
  myApp.initAppMenu({isDebug: (process.env.DEBUG != null)});
  myApp.initDockMenu();
});

// resetWindowPosition
function resetWindowPosition(): void {
  myApp.dictWindow.center();
}
AqDicEdit.prototype.resetWindowPosition = resetWindowPosition;

// switchAlwaysOnTop
function switchAlwaysOnTop(): void {
  const newflg = !myApp.dictWindow.isAlwaysOnTop();
  myApp.dictWindow.setAlwaysOnTop(newflg);
  myApp.dictWindow.webContents.send('switchAlwaysOnTop', newflg);
}
ipcMain.on('switchAlwaysOnTop', (event, message) => {
  const newflg = !myApp.dictWindow.isAlwaysOnTop();
  myApp.dictWindow.setAlwaysOnTop(newflg);
  event.sender.send('switchAlwaysOnTop', newflg);
});
AqDicEdit.prototype.switchAlwaysOnTop = switchAlwaysOnTop;

