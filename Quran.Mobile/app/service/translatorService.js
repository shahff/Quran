/// <reference path="../../scripts/typings/cordova/plugins/filesystem.d.ts" />
/// <reference path="../../scripts/typings/cordova/plugins/filetransfer.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var main;
(function (main) {
    "use strict";

    var translatorService = (function () {
        function translatorService($http, $q, appService) {
            this.$http = $http;
            this.$q = $q;
            this.appService = appService;
            this.defaultTranslatorId = "en.yusufali";
        }
        translatorService.prototype.getTranslatorMetaData = function () {
            var deferral = this.$q.defer();

            this.$http.get('content/translatorData.json', { cache: true }).then(function (r) {
                //var reciters: main.model.Translator[] = [];
                var result = r.data;

                //_.each(result.reciter, function (i: any) {
                //    var d = new main.model.Reciter();
                //    d.fullName = i.fname;
                //    d.name = i.name;
                //    d.id = i.ID;
                //    d.lang = i.lang;
                //    reciters.push(d);
                //});
                deferral.resolve(result.translator);
            }, function (error) {
                alert(error);
                deferral.reject(error);
            });

            return deferral.promise;
        };

        translatorService.prototype.downloadFile = function (translatorID) {
            var fileTransfer = new FileTransfer();

            //var translatorID = "en.yusufali";
            var uri = encodeURI(main.model.CONSTANT.translationURL + translatorID);
            var filePath = main.model.CONSTANT.localTranslationFullPath + translatorID + ".txt";

            var deferral = this.$q.defer();

            deferral.resolve("testing"); //when testing

            //fileTransfer.download(uri,filePath,
            //    (entry)=> {
            //        this.appService.storeDownloadFileName(translatorID);
            //        //console.log("download complete: " + entry.fullPath);
            //        //alert('ok' + entry.fullPath + ' - ' + entry.toURL);
            //        deferral.resolve(entry.fullPath);
            //    },
            //    (error) =>{
            //        //alert(error.source + '  - ' + error.target + ' - ' + error.code);
            //        deferral.resolve('err:'+error.source + '  - ' + error.target + ' - ' + error.code);
            //    },false,true);
            return deferral.promise;
        };

        translatorService.prototype.removeFile = function (translatorID) {
            var deferral = this.$q.defer();

            this.appService.getDownloadFileNames().then(function (ls) {
                //remove ID from DB
                var arrTR = _.without(ls, translatorID);
                localforage.setItem(main.model.CONSTANT.downloadTranslationDBKey, arrTR);

                //remove file
                //var filePath = model.CONSTANT.localTranslationFullPath + translatorID + ".txt";
                //this.removeDownloadFile(filePath);
                deferral.resolve(arrTR);
            });

            return deferral.promise;
        };

        //File System helpers
        translatorService.prototype.removeDownloadFile = function (filePath) {
            this.listDir(filePath).then(function (f) {
                if (f.length > 0)
                    f[0].remove(function () {
                    }, function (error) {
                        alert('unable to remove file');
                    });
            });
        };

        translatorService.prototype.getDownloadFileNamesX = function () {
            this.listDir('Quran.Mobile/downloads/translation').then(function (n) {
                //if(e.
                var dd = n;
            });
        };

        translatorService.prototype.getFilesystem = function () {
            ////win.requestFileSystem(win.PERSISTENT, 20000, this.onFileSuccess, this.onFileError);
            var deferral = this.$q.defer();
            var win = window;
            win.requestFileSystem(win.PERSISTENT, 1024 * 1024, function (filesystem) {
                deferral.resolve(filesystem);
            }, function (err) {
                deferral.reject(err);
            });

            return deferral.promise;
        };

        translatorService.prototype.listDir = function (filePath) {
            var deferral = this.$q.defer();

            this.getFilesystem().then(function (filesystem) {
                filesystem.root.getDirectory(filePath, { create: false }, function (parent) {
                    var reader = parent.createReader();
                    reader.readEntries(function (entries) {
                        deferral.resolve(entries);
                    }, function () {
                        deferral.reject('DIR_READ_ERROR : ' + filePath);
                    });
                }, function () {
                    deferral.reject('DIR_NOT_FOUND : ' + filePath);
                });
            });

            return deferral.promise;
        };
        translatorService.$inject = ['$http', '$q', 'appService'];
        return translatorService;
    })();
    main.translatorService = translatorService;
})(main || (main = {}));
//# sourceMappingURL=translatorService.js.map
