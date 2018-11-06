var _ipcRenderer, ipcRenderer = () => { _ipcRenderer = _ipcRenderer || require('electron').ipcRenderer; return _ipcRenderer; };
var _log, log                 = () => { _log = _log || require('electron-log'); return _log; };

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

    ctrl.export = function(): void {
        var r = AquesService.generateCSV('/Users/taku-o/Desktop/aqdicedit/vendor/aq_dic_large/aq_user.dic', '/Users/taku-o/Desktop/test.csv');
    };
    ctrl.reset = function(): void {
    };

    ctrl.select = function(): void {
    };

        this.export();

  }]);
