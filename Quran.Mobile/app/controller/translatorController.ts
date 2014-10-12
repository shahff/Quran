/// <reference path="../service/translatorservice.ts" />

module main {
    "use strict"

    export class translatorController {

        public translators: main.model.Translator[];
        public selectedTranslator: string;
        
        public static $inject = ['$scope', '$q', '$ionicLoading','$location','$ionicScrollDelegate', 'translatorService','appService'];
        constructor(private $scope, private $q: ng.IQService, private $ionicLoading, private $location, private $ionicScrollDelegate, private translatorService: translatorService, private appService: appService) {
            
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

            this.$location.hash(selectedItem.id);
            this.$ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(true);
            
        }

        downloadFile(selectedItem: main.model.Translator): void {

            this.$ionicLoading.show({ template: '<i class="icon ion-loading-c"></i> Downloading...' });

            this.translatorService.downloadFile(selectedItem.id).then(s=> {
                this.$ionicLoading.hide();
                selectedItem.isDownloaded = true;
                this.setTranslator(selectedItem);
            });
        }

        removeFile(selectedItem: main.model.Translator): void {

            this.$ionicLoading.show({ template: '<i class="icon ion-loading-c"></i> Removing File...' });

            this.translatorService.removeFile(selectedItem.id).then(s=> {
                this.$ionicLoading.hide();
                selectedItem.isDownloaded = false;
            });
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

    }
}

