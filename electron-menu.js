'use strict';
exports.__esModule = true;
var electron_1 = require("electron");
// application menu
function initAppMenu(options) {
    var myApp = this;
    var menuList = [
        {
            label: 'AqDicEdit',
            submenu: [
                {
                    label: 'About AqDicEdit',
                    click: function () { myApp.showAboutWindow(); }
                },
                { type: 'separator' },
                {
                    role: 'services',
                    submenu: []
                },
                { type: 'separator' },
                {
                    role: 'quit',
                    accelerator: 'Command+Q'
                },
            ]
        },
        {
            label: '編集',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' },
                { type: 'separator' },
                { label: 'Speech',
                    submenu: [
                        { role: 'startspeaking' },
                        { role: 'stopspeaking' },
                    ]
                },
            ]
        },
        {
            label: '表示',
            submenu: [
                { role: 'reload' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ]
        },
        {
            label: 'ウインドウ',
            submenu: [
                {
                    label: '前面表示固定切替',
                    click: function () { myApp.switchAlwaysOnTop(); }
                },
                { type: 'separator' },
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: 'Zoom',
                    role: 'zoom'
                },
                { type: 'separator' },
                {
                    label: 'Bring All to Front',
                    role: 'front'
                },
                { type: 'separator' },
                {
                    label: 'ウインドウ位置リセット',
                    click: function () { myApp.resetWindowPosition(); }
                },
            ]
        },
        {
            label: 'ヘルプ',
            submenu: [
                {
                    label: 'チュートリアル',
                    click: function () { myApp.dictWindow.webContents.send('menu', 'tutorial'); }
                },
                {
                    label: 'ショートカットキー',
                    click: function () { myApp.dictWindow.webContents.send('menu', 'shortcut'); }
                },
                { type: 'separator' },
                {
                    label: 'Learn More',
                    click: function () { electron_1.shell.openExternal('https://taku-o.github.io/myukkurivoice/'); }
                },
            ]
        },
    ];
    // Debugメニューを追加 (Toggle Developer Tools、Install Devtron)
    if (options.isDebug) {
        menuList.splice(4, 0, {
            label: 'Debug',
            submenu: [
                { role: 'toggledevtools' },
                {
                    label: 'Install Devtron',
                    click: function () { myApp.dictWindow.webContents.send('menu', 'devtron'); }
                },
            ]
        });
    }
    // @ts-ignore
    var menuTemplate = electron_1.Menu.buildFromTemplate(menuList);
    electron_1.Menu.setApplicationMenu(menuTemplate);
}
exports.initAppMenu = initAppMenu;
// dock menu
function initDockMenu() {
    var myApp = this;
    var dockMenuList = [
        {
            label: 'About AqDicEdit',
            click: function () { myApp.showAboutWindow(); }
        },
        {
            label: 'ウインドウ位置リセット',
            click: function () { myApp.resetWindowPosition(); }
        },
    ];
    var dockMenu = electron_1.Menu.buildFromTemplate(dockMenuList);
    electron_1.app.dock.setMenu(dockMenu);
}
exports.initDockMenu = initDockMenu;
