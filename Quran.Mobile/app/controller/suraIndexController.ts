module main {
    "use strict"

    export class suraIndexController {

        public suras: main.model.Sura[];

        public static $inject = ['$scope', 'suraService'];
        constructor(private $scope, private suraService: suraService) {
            var that = this;

            $scope.vm = this;

            this.getSuraIndex();
        }

        getSuraIndex(): void {
            this.suraService.getSuraMetaData().then((s) => {
                this.$scope.vm.suras = s
            });
        }


    }
}

//angular.module("main.sura", []);