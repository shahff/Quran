/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module main {
    "use strict"

    export class reciterService {
        static $inject = ['$http', '$q'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        getReciterMetaData(): ng.IPromise<main.model.Reciter[]> {
            
            

            var deferral = this.$q.defer<main.model.Reciter[]>();

            this.$http.get('content/reciterData.json', { cache: true }).then(r=> {

                var reciters: main.model.Reciter[] = [];
                var result= <any>r.data;
                _.each(result.reciter, function(i:any) {
                    var d = new main.model.Reciter();
                    d.fullName = i.fname;
                    d.name = i.name;
                    d.id = i.ID;
                    d.lang = i.lang;
                    reciters.push(d);  
                });

                deferral.resolve(reciters);

            }, error=> { deferral.reject(error) });
            
            return deferral.promise;

        }

    }
}
