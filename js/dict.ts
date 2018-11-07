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
angular.module('dictApp', ['dictModel', 'dictService', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav'])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  // controller
  .controller('DictController',
    ['$scope', 'AquesService',
    function($scope, AquesService) {

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

    // initialize records
    $scope.gridOptions = {};
    $scope.gridOptions.columnDefs = [
        {
            name: 'source', enableCellEdit: true, displayName: '登録語句', width: 200,
        },
        {
            name: 'encoded', enableCellEdit: true, displayName: '音声記号列', width: 300,
        },
        {
            name: 'kind', displayName: '品詞',
            editableCellTemplate: 'ui-grid/dropdownEditor',
            cellFilter: 'mapKind', editDropdownValueLabel: 'kind', editDropdownOptionsArray: [
                { id: 0,  kind: '名詞', },
                { id: 1,  kind: '名詞(サ変)', },
                { id: 2,  kind: '人名', },
                { id: 3,  kind: '人名(姓)', },
                { id: 4,  kind: '人名(名)', },
                { id: 5,  kind: '固有名詞', },
                { id: 6,  kind: '固有名詞(組織)', },
                { id: 7,  kind: '固有名詞(地域)', },
                { id: 8,  kind: '固有名詞(国)', },
                { id: 9,  kind: '代名詞', },
                { id: 10, kind: '代名詞(縮約)', },
                { id: 11, kind: '名詞(副詞可能)', },
                { id: 12, kind: '名詞(接続詞的)', },
                { id: 13, kind: '名詞(形容動詞語幹)', },
                { id: 14, kind: '名詞(ナイ形容詞語幹)', },
                { id: 15, kind: '形容詞', },
                { id: 16, kind: '副詞', },
                { id: 17, kind: '副詞(助詞類接続)', },
                { id: 18, kind: '接頭詞(名詞接続)', },
                { id: 19, kind: '接頭詞(動詞接続)', },
                { id: 20, kind: '接頭詞(数接続)', },
                { id: 21, kind: '接頭詞(形容詞接続)', },
                { id: 22, kind: '接続詞', },
                { id: 23, kind: '連体詞', },
                { id: 24, kind: '記号', },
                { id: 25, kind: '記号(アルファベット)', },
                { id: 26, kind: '感動詞', },
                { id: 27, kind: '間投詞', },
            ], 
        },
    ];
    $scope.saveRow = function( rowEntity ) {
        console.log('saveRow');
    };
    $scope.gridOptions.data = [
     {
        source: "ゆっくり霊夢",
        encoded: "ユック'リ/レ'イム",
        kind: 2,
      },
     {
        source: "ゆっくり霊夢",
        encoded: "ユック'リ/レ'イム",
        kind: 2,
      },
     {
        source: "ゆっくり霊夢",
        encoded: "ユック'リ/レ'イム",
        kind: 2,
      },
     {
        source: "ゆっくり霊夢",
        encoded: "ユック'リ/レ'イム",
        kind: 2,
      },
     {
        source: "ゆっくり霊夢",
        encoded: "ユック'リ/レ'イム",
        kind: 2,
      },
    ];

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

  }])
  .filter('mapKind', function() {
    var kindHash = {
      0: '名詞',
      1: '名詞(サ変)',
      2: '人名',
      3: '人名(姓)',
      4: '人名(名)',
      5: '固有名詞',
      6: '固有名詞(組織)',
      7: '固有名詞(地域)',
      8: '固有名詞(国)',
      9: '代名詞',
      10: '代名詞(縮約)',
      11: '名詞(副詞可能)',
      12: '名詞(接続詞的)',
      13: '名詞(形容動詞語幹)',
      14: '名詞(ナイ形容詞語幹)',
      15: '形容詞',
      16: '副詞',
      17: '副詞(助詞類接続)',
      18: '接頭詞(名詞接続)',
      19: '接頭詞(動詞接続)',
      20: '接頭詞(数接続)',
      21: '接頭詞(形容詞接続)',
      22: '接続詞',
      23: '連体詞',
      24: '記号',
      25: '記号(アルファベット)',
      26: '感動詞',
      27: '間投詞',
    };
    return function(input) {
      if (!input){
        return '';
      } else {
        return kindHash[input];
      }
    };
  });
