﻿module main {
    "use strict"
    
    export class suraController {

        public suras: main.model.Sura[];
        public suraID: number; //sample - 2:85
        public ayaID: number;
        hasBismillah: boolean;

        public static $inject = ['$scope', '$stateParams', '$location','$ionicScrollDelegate', 'appService','suraService'];
        constructor(private $scope, private $stateParams, private $location, private $ionicScrollDelegate, private appService: appService,private suraService: suraService) {
            
            $scope.vm = this;

            //sample id = 2:85
            this.suraID = 19;
            this.ayaID = 1;

            if (this.$stateParams.id !== "") {
                var suraParam = this.$stateParams.id.split(':');
                this.suraID = +suraParam[0];
                this.ayaID = (suraParam[1] === undefined) ? 1 : +suraParam[1];

            }
            
            this.hasBismillah = (this.suraID === 1 || this.suraID === 9)?false:true;
            
            if (this.suraID > 0)
              this.getSura();
        }
        
        getSura(): void {
            this.suraService.getSura(this.suraID).then(s=> {
                this.$scope.vm.surasVerses = s;

                //slide to position
                this.slideTo(this.ayaID);
            });
        }

        slideTo(ayaID: number): void {

            if (ayaID > 1) {
                this.$location.hash(ayaID);
                this.$ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(ayaID, true);
            }
        }


        //index.html
        getSuraIndex(): void {
            this.suraService.getSuraMetaData().then((s) => {
                this.$scope.vm.suras = s;
            });
        }

    }
}

//angular.module("main.sura", []);