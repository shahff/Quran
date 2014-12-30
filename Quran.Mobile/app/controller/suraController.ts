/// <reference path="../../scripts/typings/cordova/plugins/media.d.ts" />

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
        public isBookmarked: boolean = false;
        public intervalObj: ng.IPromise<any>;
        public autoPlayOn: boolean;

        public static $inject = ['$scope', '$stateParams', '$location', '$interval','$ionicPlatform', '$ionicScrollDelegate', 'appService', 'suraService', 'bookmarkService','mediaService'];
        constructor(private $scope, private $stateParams, private $location, private $interval: ng.IIntervalService, private $ionicPlatform, private $ionicScrollDelegate, private appService: appService, private suraService: suraService, private bookmarkService: bookmarkService, private mediaService: mediaService) {
    
            $scope.vm = this;
            
            //sample id = 2:85
            this.suraID = 19;
            this.ayaID = 1;

            if (this.$stateParams.id !== "") {
                var suraParam = this.$stateParams.id.split(':');
                this.suraID = +suraParam[0];
                this.ayaID = (suraParam[1] === undefined) ? 1 : +suraParam[1];
            }
            else if (this.appService.appSetting.selectedSura != null)
            {
                this.suraID = this.appService.appSetting.selectedSura.id;
                this.ayaID = this.appService.appSetting.selectedSura.selectedAyaID;
            }
           
            this.hasBismillah = (this.suraID === 1 || this.suraID === 9)?false:true;
            
            if (this.suraID > 0)
                this.getSura();

            this.selectedBookmarks = new Array<string>();

            this.displayContentType = this.appService.appSetting.selectedDisplayContentType;

            
            
            this.$scope.$on("$destroy", () => {

                if (this.appService.autoPlayOn)
                    this.stop();

                //save to DB
                this.appService.storeAppSetting();

                //this.mediaService.stop();
            });
        }
        
        getSura(): void {
            this.suraService.getSura(this.suraID).then(s=> {
                s.selectedAyaID = this.ayaID;
                this.selectedSura = s;
                this.appService.appSetting.selectedSura = this.selectedSura;

                //set bookmarks
                this.getBookmarkIDs();

                //auto play
                if (this.appService.autoPlayOn)
                    this.play();
            });
        }

        slideTo(ayaID: number): void {

            this.selectedSura.selectedAyaID = this.ayaID = ayaID;
            if (ayaID > +this.selectedSura.numberOfAyas ){  
                //move next sura
                this.next();

            }
            if (ayaID >= 1) {
                this.$location.hash(ayaID);
                this.$ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(true);
            }

            //set bookmark
            var id = this.selectedSura.id + ":" + this.selectedSura.selectedAyaID;
            this.isBookmarked = _.indexOf(this.selectedBookmarks, id) > -1;

        }
        
        play(hasUserRequestStop?:boolean): void {

            if (this.appService.autoPlayOn && hasUserRequestStop)
            {
                this.autoPlayOn = this.appService.autoPlayOn = false;
                this.stop();
                //this.mediaService.stop();
                return;
            }

            this.autoPlayOn = this.appService.autoPlayOn = true;
            //** TESTING ONLY ***
            this.intervalObj = this.$interval(() => {
            if(this.ayaID >0)
             this.ayaID++
            this.slideTo(this.ayaID);
            }, 3000);

            //this.playAudio();
        }

        playAudio(): void {

            this.mediaService.play(this.ayaID).then((res) => {
                if (res === 'done') {

                    if (this.ayaID > 0)
                        this.ayaID++

                    this.slideTo(this.ayaID);

                    this.playAudio();
                 }
            });
        }

        displayContent(): void {

            var displayContent = this.appService.appSetting.selectedDisplayContentType === 'arabic' ? 'translation' : 'arabic';

            this.displayContentType = displayContent;
            this.appService.appSetting.selectedDisplayContentType = displayContent;
            //this.appService.storeAppSetting();

        }

        private nav(moveNext: boolean): void {

            var currSuraID = +this.selectedSura.id;
            var suraID = moveNext ? currSuraID + 1 : currSuraID - 1;
            suraID = suraID > 114 ? 1 : suraID;

            if (suraID >= 1 && suraID <= 114) {
                var path = '/main/sura/' + suraID;
                this.$location.hash(1);
                this.$location.path(path)
            }
        }

        stop(): void {

            if (this.intervalObj)
                this.$interval.cancel(this.intervalObj);
        }

        next(): void {
            this.nav(true);
        }

        previous(): void {
            this.nav(false);
        }

        bookmark(): void {
            this.isBookmarked = true;
            this.bookmarkService.storeBookmark(this.selectedSura);
            this.getBookmarkIDs();
        }

        private getBookmarkIDs(): void {
            var selSuraID = this.selectedSura.id;
            this.bookmarkService.getBookmarks().then(bms=> {
                this.selectedBookmarks = _.pluck(_.filter(bms, function (b) { return b.selectedSura.id === selSuraID; }), "id");

            });
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