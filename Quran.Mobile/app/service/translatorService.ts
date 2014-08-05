/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module main {
    "use strict"

    export class translatorService {
        static $inject = ['$http', '$q'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        getTranslatorMetaData(): ng.IPromise<main.model.Translator[]> {

            var deferral = this.$q.defer<main.model.Translator[]>();

            this.$http.get('content/translatorData.json', { cache: true }).then(r=> {

                //var reciters: main.model.Translator[] = [];
                var result = <any>r.data;
                //_.each(result.reciter, function (i: any) {
                //    var d = new main.model.Reciter();
                //    d.fullName = i.fname;
                //    d.name = i.name;
                //    d.id = i.ID;
                //    d.lang = i.lang;
                //    reciters.push(d);
                //});

                deferral.resolve(<main.model.Translator[]>result.translator);

            }, error=> { alert(error);deferral.reject(error); });

            return deferral.promise;

        }

    }
}
