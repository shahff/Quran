module main {
    "use strict"
    
    export class suraController {

        public selectedSura: main.model.Sura;
        public suraID: number; //sample - 2:85
        public ayaID: number;
        public hasBismillah: boolean;
        public showTranslation: boolean;
        public displayContentType: string = 'arabic';
        public selectedBookmarks: string[] = [];
        public isBookmarked : boolean = false;

        public static $inject = ['$scope', '$stateParams', '$location', '$ionicScrollDelegate', 'appService', 'suraService', 'bookmarkService'];
        constructor(private $scope, private $stateParams, private $location, private $ionicScrollDelegate, private appService: appService, private suraService: suraService, private bookmarkService: bookmarkService) {
    
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

            this.selectedBookmarks = new Array<string>();

            this.displayContentType = this.appService.appSetting.selectedDisplayContentType;

        }
        
        getSura(): void {
            this.suraService.getSura(this.suraID).then(s=> {
                s.selectedAyaID = this.ayaID;
                this.selectedSura = s;

                //set bookmarks
                this.getBookmarkIDs();

                //slide to position & check bookmark
                this.slideTo(this.ayaID);
                
            });
        }

        slideTo(ayaID: number): void {
            this.selectedSura.selectedAyaID = ayaID;
            if (ayaID > 1) {
                this.$location.hash(ayaID);
                this.$ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(true);
            }

            //set bookmark
            var id = this.selectedSura.id + ":" + this.selectedSura.selectedAyaID; 
            this.isBookmarked  = _.indexOf(this.selectedBookmarks, id ) > -1;
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


        bookmark(): void {
            this.bookmarkService.storeBookmark(this.selectedSura);
            this.getBookmarkIDs();
        }

        getBookmarkIDs(): void {
            var selSuraID = this.selectedSura.id;
            this.bookmarkService.getBookmarks().then(bms=> {
                this.selectedBookmarks = _.pluck(_.filter(bms, function (b) { return b.selectedSura.id === selSuraID; }), "id");
            });
        }

        displayContent(displayContent: string): void {
            this.displayContentType = displayContent;
            this.appService.appSetting.selectedDisplayContentType = displayContent;
            this.appService.storeAppSetting();

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