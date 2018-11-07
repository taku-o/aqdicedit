var app = require('electron').remote.app;
var _ipcRenderer, ipcRenderer = () => { _ipcRenderer = _ipcRenderer || require('electron').ipcRenderer; return _ipcRenderer; };
var _log, log                 = () => { _log = _log || require('electron-log'); return _log; };
var _fs, fs                   = () => { _fs = _fs || require('fs'); return _fs; };
var _parse, parse             = () => { _parse = _parse || require('csv-parse/lib/sync'); return _parse; };
var _stringify, stringify     = () => { _stringify = _stringify || require('csv-stringify/lib/sync'); return _stringify; };
var _epath, epath             = () => { _epath = _epath || require('electron-path'); return _epath; };

var unpackedPath = epath().getUnpackedPath();

// handle uncaughtException
process.on('uncaughtException', (err: Error) => {
  log().error('main:event:uncaughtException');
  log().error(err);
  log().error(err.stack);
});

// angular app
angular.module('dictApp',
  ['dictModel', 'dictService',
   'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.cellNav',
  ])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  // controller
  .controller('DictController',
    ['$scope', '$q', '$timeout', 'AquesService', 'KindList',
    function($scope, $q, $timeout, AquesService, KindList) {

    // shortcut
    ipcRenderer().on('shortcut', (event, action: string) => {
    });

    // menu
    ipcRenderer().on('menu', (event, action: string) => {
    });

    // init
    const ctrl = this;
    $scope.message = '';
    // AqDicEdit, MYukkuriVoice data dir
    const rscDictDir = `${unpackedPath}/vendor/aq_dic_large`;
    const mAppDictDir = `${app.getPath('userData').replace('AqDicEdit', 'MYukkuriVoice')}/userdict`;

    // initialize records
    $scope.gridOptions = {
      enableFiltering: true,
      enableRowSelection: true,
      multiSelect: false,
      onRegisterApi: (gridApi) => {
        $scope.gridApi = gridApi;
        $scope.gridApi.edit.on.afterCellEdit($scope, (rowEntity, colDef, newValue, oldValue) => {
          if (newValue != oldValue) {
            rowEntity.isDirty = true;
          }
        });
        $scope.gridApi.rowEdit.on.saveRow($scope, (rowEntity) => {
          const d = $q.defer();
          $scope.gridApi.rowEdit.setSavePromise(rowEntity, d.promise);

          if ((!rowEntity.source) || (!rowEntity.encoded)) {
            rowEntity.isDirty = true;
            d.reject('isDirty'); return d.promise;
          }

          const r = AquesService.validateInput(rowEntity.source, rowEntity.encoded, rowEntity.kind);
          if (!r) {
            d.reject('isError');
            rowEntity.isError = true;
          } else {
            delete rowEntity.isDirty;
            delete rowEntity.isError;
            d.resolve('ok');
          }
          return d.promise;
        });
      },
    };

    $scope.gridOptions.columnDefs = [
      {
        name: 'source', displayName: '登録語句', enableCellEdit: true, width: 200,
        field: 'source', enableFiltering: true,
      },
      {
        name: 'encoded', displayName: '音声記号列', enableCellEdit: true, width: 300,
        field: 'encoded', enableFiltering: true,
      },
      {
        name: 'kind', displayName: '品詞', editableCellTemplate: 'ui-grid/dropdownEditor',
        cellFilter: 'mapKind', editDropdownValueLabel: 'kind', editDropdownOptionsArray: KindList,
        field: 'kind', enableFiltering: false,
      },
    ];
    $scope.gridOptions.data = [];

    this.init = function(): ng.IPromise<boolean> {
      return this.setup().then(() => {
      return this.loadCsv().then((records) => {
        $scope.gridOptions.data = records;
        $timeout(function(){
          $scope.$apply();
        });
        return true;
      });
      });
    }
    this.setup = function(): ng.IPromise<string> {
      const d = $q.defer();
      // mkdir
      fs().stat(`${mAppDictDir}`, (err: Error, stats) => {
        if (err) {
          fs().mkdirSync(`${mAppDictDir}`);
        }
      // copy resource
      fs().stat(`${mAppDictDir}/aq_user.csv`, (err: Error, stats) => {
        if (err) {
          fs().writeFileSync(`${mAppDictDir}/aq_user.csv`, fs().readFileSync(`${rscDictDir}/aq_user.csv`));
        }
        d.resolve('ok');
      });
      });
      return d.promise;
    };
    this.loadCsv = function(): ng.IPromise<any> {
      const d = $q.defer();
      fs().readFile(`${mAppDictDir}/aq_user.csv`, 'utf-8', (err: Error, data) => {
        if (err) {
          d.reject(err); return;
        }
        const records = (parse())(data, {
          columns: [
            'source',
            'encoded',
            'kind',
          ],
          skip_empty_lines: true,
        });
        d.resolve(records);
      });
      return d.promise;
    };
    this.init();

    // action
    ctrl.add = function(): void {
      $scope.gridOptions.data.unshift({
        source:'',
        encoded:'',
        kind:0,
        isDirty: true,
      });
    };
    ctrl.insert = function(): void {
      if ($scope.gridApi.selection.getSelectedRows()) {
        const row = $scope.gridApi.selection.getSelectedRows()[0];
        var index = $scope.gridOptions.data.indexOf(row);
        $scope.gridOptions.data.splice(index, 0, {
          source:'',
          encoded:'',
          kind:0,
          isDirty: true,
        });
      } else {
        ctrl.add();
      }
    };
    ctrl.delete = function(): void {
      if ($scope.gridApi.selection.getSelectedRows()) {
        const row = $scope.gridApi.selection.getSelectedRows()[0];
        var index = $scope.gridOptions.data.indexOf(row);
        $scope.gridOptions.data.splice(index, 1);
      }
    };

    ctrl.save = function(): void {
      const data = (stringify())($scope.gridOptions.data, {
        columns: [
          'source',
          'encoded',
          'kind',
        ],
        quote: '',
      });
      fs().writeFileSync(`${mAppDictDir}/aq_user.csv`, data);
    };
    ctrl.cancel = function(): ng.IPromise<boolean> {
      return this.loadCsv().then((records) => {
        $scope.gridOptions.data = records;
        $timeout(function(){
          $scope.$apply();
        });
        return true;
      });
    };
    ctrl.export = function(): void {
      // generate user dict
      const r = AquesService.generateUserDict(`${mAppDictDir}/aq_user.csv`, `${mAppDictDir}/aq_user.dic`);
      // copy resource
      fs().writeFileSync(`${mAppDictDir}/aqdic.bin`, fs().readFileSync(`${rscDictDir}/aqdic.bin`));
    };
    ctrl.reset = function(): ng.IPromise<boolean> {
      // reset csv
      fs().writeFileSync(`${mAppDictDir}/aq_user.csv`, fs().readFileSync(`${rscDictDir}/aq_user.csv`));
      // and load
      return this.loadCsv().then((records) => {
        $scope.gridOptions.data = records;
        $timeout(function(){
          $scope.$apply();
        });
        return true;
      });
    };

  }])
  .filter('mapKind', ['KindHash', function(KindHash) {
    var kindHash = KindHash;
    return function(input) {
      if (!input){
        return '';
      } else {
        return kindHash[input];
      }
    };
  }]);
