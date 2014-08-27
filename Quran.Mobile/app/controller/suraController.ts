module main {
    "use strict"
    
    export class suraController {

        public selectedSura: main.model.Sura;
        public suraID: number; //sample - 2:85
        public ayaID: number;
        hasBismillah: boolean;
        showTranslation: boolean;
        public displayContentType: string = 'arabic';

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
            this.suraService.getSura(this.suraID, 'en.yusufali').then(s=> {
                s.selectedAyaID = this.ayaID;
                this.$scope.vm.selectedSura = s;

                //slide to position
                this.slideTo(this.ayaID);
                
            });
        }

        slideTo(ayaID: number): void {
            this.selectedSura.selectedAyaID = ayaID;
            if (ayaID > 1) {
                this.$location.hash(ayaID);
                this.$ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(true);
            }
        }


        play(): void {

            
            var ayaID = this.$location.$$hash;
            if (ayaID++ > +this.selectedSura.numberOfAyas -1)
            {
                //move next sura
                var path = '/main/sura/' + (+this.selectedSura.id + 1);
                this.$location.hash(1);
                this.$location.path(path);
                return;

            }
            this.slideTo(ayaID);
        }

        displayContent(displayContent: string): void {
            this.displayContentType = displayContent;
            //this.$scope.$apply();
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