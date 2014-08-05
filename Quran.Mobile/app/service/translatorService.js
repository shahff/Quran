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
        translatorService.$inject = ['$http', '$q'];
        return translatorService;
    })();
    main.translatorService = translatorService;
})(main || (main = {}));
//# sourceMappingURL=translatorService.js.map
