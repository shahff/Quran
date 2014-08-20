/// <reference path="../../scripts/typings/cordova/plugins/filetransfer.d.ts" />
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

        readFile(): void {

            var filePath = main.model.CONSTANT.localTranslationPath + "en.yusufali.txt";
            this.$http.get(filePath, { cache: true }).then(s => {
                alert(s.data);
            }).catch(e=> alert(e))

        }

        downloadFile(translator: string): void {

            var fileTransfer = new FileTransfer();
            var translator = "en.yusufali";
            var uri = encodeURI(main.model.CONSTANT.translationURL + translator);
            var filePath = main.model.CONSTANT.localTranslationPath + translator + ".txt";
           
            fileTransfer.download(
                uri,
                filePath,
                function (entry) {
                    alert('ok' + entry.fullPath + ' - ' + entry.toURL); 

                    console.log("download complete: " + entry.fullPath);
                    
                },
                function (error) {
                    alert(error.source + '  - ' + error.target + ' - ' + error.code);
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("upload error code" + error.code);
                },
                false,true
             
                );
        }
    }
}
