/// <reference path="../service/translatorservice.ts" />

module main {
    "use strict"

    export class translatorController {

        public translators: main.model.Translator[];
        public selectedTranslator: string;
        public isDownloaded: boolean = false;
        
        public static $inject = ['$scope', 'translatorService','appService'];
        constructor(private $scope, private translatorService: translatorService, private appService: appService) {
            var that = this;

            $scope.vm = this;
            $scope.main.showBusy();

            this.getTranslators();
            //$scope.vm.isDownloaded = this.isDownloaded = true;
            
            this.selectedTranslator = appService.appSetting.selectedTranslator.name;


        }

        
        getTranslators(): void {
            this.translatorService.getTranslatorMetaData().then((s) => {
                this.translators = s;
                this.$scope.main.hideBusy();

                
                //this.translators[0].isDownloaded = true;
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

        readFile(): void {
            this.translatorService.readFile();
        }
    }
}

