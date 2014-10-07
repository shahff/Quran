/// <reference path="../service/translatorservice.ts" />

module main {
    "use strict"

    export class translatorController {

        public translators: main.model.Translator[];
        public selectedTranslator: string;
        
        public static $inject = ['$scope', '$q', '$ionicLoading', 'translatorService','appService'];
        constructor(private $scope, private $q: ng.IQService,private $ionicLoading, private translatorService: translatorService, private appService: appService) {
            
            $scope.vm = this;
            this.$ionicLoading.show({template: 'Loading...'});

            this.getTranslators();
            
            this.selectedTranslator = appService.appSetting.selectedTranslator.name;

        }

        
        getTranslators(): void {
            this.translatorService.getTranslatorMetaData().then((s) => {
                this.translators = s;
                this.getFileNames();

                this.$ionicLoading.hide();
            });
        }

        setTranslator(selectedItem: main.model.Translator): void {
            this.selectedTranslator = selectedItem.name;
            this.appService.appSetting.selectedTranslator = selectedItem;
            this.appService.storeAppSetting();
        }

        downloadFile(): void {
            this.translatorService.downloadFile('sds');
        }

        getFileNames(): void {
            this.appService.getDownloadFileNames().then(fns=> {

                _.each(fns, (f) => {
                    var transFound = _.findWhere(this.translators, { id: f });    
                    transFound.isDownloaded = true;
                });
                this.$scope.$apply();
            });
        }


        readFile(): void {
            this.translatorService.readFile();
        }

    }
}

