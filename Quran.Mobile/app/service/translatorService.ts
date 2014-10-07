/// <reference path="../../scripts/typings/cordova/plugins/filesystem.d.ts" />
/// <reference path="../../scripts/typings/cordova/plugins/filetransfer.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module main {
    "use strict"
    
    export class translatorService {

        public downloadFileName: string[];
        public defaultTranslatorId: string = "en.yusufali";

        static $inject = ['$http', '$q','appService'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private appService: appService) {
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

            var filePath = main.model.CONSTANT.localTranslationFullPath + "en.yusufali.txt";
            this.$http.get(filePath, { cache: true }).then(s => {
                alert(s.data);
            }).catch(e=> alert(e))

        }

        downloadFile(translator: string): void {

            var fileTransfer = new FileTransfer();
            var translatorID = "en.yusufali";
            var uri = encodeURI(model.CONSTANT.translationURL + translatorID);
            var filePath = model.CONSTANT.localTranslationFullPath + translatorID + ".txt";
           
            fileTransfer.download(
                uri,
                filePath,
                (entry)=> {
                    alert('ok' + entry.fullPath + ' - ' + entry.toURL); 

                    this.appService.storeDownloadFileName(translatorID);
                    //console.log("download complete: " + entry.fullPath);
                    
                },
                function (error) {
                    alert(error.source + '  - ' + error.target + ' - ' + error.code);
                },false,true);
        }

        removeDownloadFileName(translatorID:string): ng.IPromise<string[]> {


            var deferral = this.$q.defer<string[]>();

            this.appService.getDownloadFileNames().then(ls=> {

                var arrTR: string[] = _.without(ls,translatorID);
                localforage.setItem(model.CONSTANT.downloadTranslationDBKey, arrTR);

                deferral.resolve(arrTR);

            });

            return deferral.promise;
        }


        //File System helpers
        getDownloadFileNamesX(): void {

            this.listDir('Quran.Mobile/downloads/translation').then(n=> {
                //if(e.
                var dd = n;
            });

        }

        getFilesystem() : ng.IPromise<FileSystem> {
            
            ////win.requestFileSystem(win.PERSISTENT, 20000, this.onFileSuccess, this.onFileError);

            var deferral = this.$q.defer<FileSystem>();
            var win: Window = window;
            win.requestFileSystem(win.PERSISTENT, 1024 * 1024, (filesystem: FileSystem) =>{
                    deferral.resolve(filesystem);
                },
                (err) =>{
                    deferral.reject(err);
                });

            return deferral.promise;
        }

        listDir(filePath): ng.IPromise<Entry[]> {
            var deferral = this.$q.defer<Entry[]>();

            this.getFilesystem().then(
                filesystem => {
                    filesystem.root.getDirectory(filePath, { create: false }, parent => {
                        var reader:DirectoryReader = parent.createReader();
                        reader.readEntries(
                            entries=> {
                                deferral.resolve(entries);
                            },
                            function () {
                                deferral.reject('DIR_READ_ERROR : ' + filePath);
                            }
                            );
                    }, function () {
                            deferral.reject('DIR_NOT_FOUND : ' + filePath);
                        });
                }
                );

            return deferral.promise;
        }
    }
}
