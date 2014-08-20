/// <reference path="../../scripts/typings/cordova/plugins/filetransfer.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var main;
(function (main) {
    "use strict";

    var translatorService = (function () {
        function translatorService($http, $q) {
            this.$http = $http;
            this.$q = $q;
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

        translatorService.prototype.readFile = function () {
            var filePath = main.model.CONSTANT.localTranslationPath + "en.yusufali.txt";
            this.$http.get(filePath, { cache: true }).then(function (s) {
                alert(s.data);
            }).catch(function (e) {
                return alert(e);
            });
        };

        translatorService.prototype.downloadFile = function (translator) {
            var fileTransfer = new FileTransfer();
            var translator = "en.yusufali";
            var uri = encodeURI(main.model.CONSTANT.translationURL + translator);
            var filePath = main.model.CONSTANT.localTranslationPath + translator + ".txt";

            fileTransfer.download(uri, filePath, function (entry) {
                alert('ok' + entry.fullPath + ' - ' + entry.toURL);

                console.log("download complete: " + entry.fullPath);
            }, function (error) {
                alert(error.source + '  - ' + error.target + ' - ' + error.code);
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            }, false, true);
        };
        translatorService.$inject = ['$http', '$q'];
        return translatorService;
    })();
    main.translatorService = translatorService;
})(main || (main = {}));
//# sourceMappingURL=translatorService.js.map
