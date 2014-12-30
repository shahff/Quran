/// <reference path="../service/reciterservice.ts" />

module main {
    "use strict"

    export class reciterController {

        public reciters: main.model.Reciter[];
        public selectedReciter: string;

        public static $inject = ['$scope', 'reciterService', 'appService'];
        constructor(private $scope,  private reciterService: reciterService, private appService: appService) {

            var that = this;

            $scope.vm = this;

            this.getReciters();

            //set selected Reciter
            this.selectedReciter = this.appService.appSetting.selectedReciter.name;
            
        }

        getReciters(): void {

            this.reciterService.getReciterMetaData().then((s) => {
                this.$scope.vm.reciters = s;
            });
        }

        setReciter(selectedItem: main.model.Reciter): void {
            this.$scope.vm.selectedReciter = selectedItem.name;
            //store selected
            this.appService.appSetting.selectedReciter = selectedItem;
            this.appService.storeAppSetting();
        }

    }
}

