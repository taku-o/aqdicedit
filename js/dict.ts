var app = require('electron').remote.app;
var _ipcRenderer, ipcRenderer = () => { _ipcRenderer = _ipcRenderer || require('electron').ipcRenderer; return _ipcRenderer; };
var _log, log                 = () => { _log = _log || require('electron-log'); return _log; };
var _fs, fs                   = () => { _fs = _fs || require('fs'); return _fs; };
var _epath, epath             = () => { _epath = _epath || require('electron-path'); return _epath; };

var unpackedPath = epath().getUnpackedPath();

// handle uncaughtException
process.on('uncaughtException', (err: Error) => {
  log().error('main:event:uncaughtException');
  log().error(err);
  log().error(err.stack);
});

// angular app
angular.module('dictApp', ['dictModel', 'dictService'])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  // controller
  .controller('DictController',
    ['AquesService', function(AquesService) {

    // shortcut
    ipcRenderer().on('shortcut', (event, action: string) => {
    });

    // menu
    ipcRenderer().on('menu', (event, action: string) => {
    });

    // init
    const ctrl = this;
    // AqDicEdit, MYukkuriVoice data dir
    const rscDictDir = `${unpackedPath}/vendor/aq_dic_large`;
    const mAppDictDir = `${app.getPath('userData').replace('AqDicEdit', 'MYukkuriVoice')}/userdict`;

    // initialize working csv

    // action
    ctrl.clear = function(): void {
    };
    ctrl.add = function(): void {
    };
    ctrl.delete = function(): void {
    };

    ctrl.save = function(): void {
    };
    ctrl.cancel = function(): void {
    };

    ctrl.import = function(): void {
      const r = AquesService.generateCSV(`${rscDictDir}/aq_user.dic`, `${app.getPath('userData')}/aq_user.csv`);
    };
    ctrl.export = function(): void {
      // mkdir, copy resource
      fs().stat(`${mAppDictDir}`, (err: Error, stats) => {
        if (err) {
          fs().mkdirSync(`${mAppDictDir}`);
          fs().writeFileSync(`${mAppDictDir}/aqdic.bin`, fs().readFileSync(`${rscDictDir}/aqdic.bin`));
        }
        // generate user dict
        const r = AquesService.generateUserDict(`${app.getPath('userData')}/aq_user.csv`, `${mAppDictDir}/aq_user.dic`);
      });
    };
    ctrl.reset = function(): void {
      fs().readFile(`${rscDictDir}/aqdic.bin`, (errRead: Error, data) => {
        if (errRead) {
          return;
        }
        fs().writeFile(`${mAppDictDir}/aqdic.bin`, data, (errWrite: Error) => {
          if (errWrite) {
            return;
          }
        });
      })
    };

    ctrl.select = function(): void {
    };


  }]);
