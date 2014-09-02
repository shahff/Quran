/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var main;
(function (main) {
    "use strict";

    var reciterService = (function () {
        function reciterService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        reciterService.prototype.getReciterMetaData = function () {
            var deferral = this.$q.defer();

            this.$http.get('content/reciterData.json', { cache: true }).then(function (r) {
                var reciters = [];
                var result = r.data;
                _.each(result.reciter, function (i) {
                    var d = new main.model.Reciter();
                    d.fullName = i.fname;
                    d.name = i.name;
                    d.id = i.ID;
                    d.lang = i.lang;
                    reciters.push(d);
                });

                deferral.resolve(reciters);
            }, function (error) {
                deferral.reject(error);
            });

            return deferral.promise;
        };
        reciterService.$inject = ['$http', '$q'];
        return reciterService;
    })();
    main.reciterService = reciterService;
})(main || (main = {}));
//# sourceMappingURL=reciterService.js.map
