'use strict';
import {app,Menu,shell} from 'electron';

// application menu
function initAppMenu(options: {isDebug: boolean}): void {
  const myApp = this;
  const menuList = [
    {
      label: 'AqDicEdit',
      submenu: [
        {
          label: 'About AqDicEdit',
          click() { myApp.showAboutWindow(); },
        },
        {type: 'separator'},
        {
          role: 'services',
          submenu: [],
        },
        {type: 'separator'},
        {
          role: 'quit',
          accelerator: 'Command+Q',
        },
      ],
    },
    {
      label: '編集',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
        {type: 'separator'},
        {label: 'Speech',
          submenu: [
            {role: 'startspeaking'},
            {role: 'stopspeaking'},
          ],
        },
      ],
    },
    {
      label: '表示',
      submenu: [
        {role: 'reload'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
      ],
    },
    {
      label: 'ウインドウ',
      submenu: [
        {
          label: '前面表示固定切替',
          click() { myApp.switchAlwaysOnTop(); },
        },
        {type: 'separator'},
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Zoom',
          role: 'zoom',
        },
        {type: 'separator'},
        {
          label: 'Bring All to Front',
          role: 'front',
        },
        {type: 'separator'},
        {
          label: 'ウインドウ位置リセット',
          click() { myApp.resetWindowPosition(); },
        },
      ],
    },
    {
      label: 'ヘルプ',
      submenu: [
        {
          label: 'チュートリアル',
          click() { myApp.dictWindow.webContents.send('menu', 'tutorial'); },
        },
        {
          label: 'ショートカットキー',
          click() { myApp.dictWindow.webContents.send('menu', 'shortcut'); },
        },
        {type: 'separator'},
        {
          label: 'Learn More',
          click() { shell.openExternal('https://taku-o.github.io/myukkurivoice/'); },
        },
      ],
    },
  ];
  // Debugメニューを追加 (Toggle Developer Tools、Install Devtron)
  if (options.isDebug) {
    (menuList as any[]).splice(4, 0,
      {
        label: 'Debug',
        submenu: [
          {role: 'toggledevtools'},
          {
            label: 'Install Devtron',
            click() { myApp.dictWindow.webContents.send('menu', 'devtron'); },
          },
        ],
      }
    );
  }
  // @ts-ignore
  const menuTemplate = Menu.buildFromTemplate(menuList);
  Menu.setApplicationMenu(menuTemplate);
}

// dock menu
function initDockMenu(): void {
  const myApp = this;
  const dockMenuList = [
    {
      label: 'About AqDicEdit',
      click() { myApp.showAboutWindow(); },
    },
    {
      label: 'ウインドウ位置リセット',
      click() { myApp.resetWindowPosition(); },
    },
  ];
  const dockMenu = Menu.buildFromTemplate(dockMenuList);
  app.dock.setMenu(dockMenu);
}

// exports
export {
  initAppMenu,
  initDockMenu,
};
