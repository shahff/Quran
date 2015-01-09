/// <reference path="../../scripts/typings/cordova/plugins/media.d.ts" />
var main;
(function (main) {
    "use strict";

    var suraController = (function () {
        function suraController($scope, $stateParams, $location, $interval, $ionicPlatform, $ionicScrollDelegate, appService, suraService, bookmarkService, mediaService) {
            var _this = this;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$location = $location;
            this.$interval = $interval;
            this.$ionicPlatform = $ionicPlatform;
            this.$ionicScrollDelegate = $ionicScrollDelegate;
            this.appService = appService;
            this.suraService = suraService;
            this.bookmarkService = bookmarkService;
            this.mediaService = mediaService;
            this.displayContentType = 'arabic';
            this.selectedBookmarks = [];
            this.isBookmarked = false;
            $scope.vm = this;
            this.suraContent = document.body.getElementsByClassName('sura-content')[0];
            this.changeFontStep = 2;
            this.defaultFontSize = 16+'px';
            this.suraContent.style.fontSize = this.defaultFontSize;

            //sample id = 2:85
            this.suraID = 19;
            this.ayaID = 1;

            if (this.$stateParams.id !== "") {
                var suraParam = this.$stateParams.id.split(':');
                this.suraID = +suraParam[0];
                this.ayaID = (suraParam[1] === undefined) ? 1 : +suraParam[1];
            } else if (this.appService.appSetting.selectedSura != null) {
                this.suraID = this.appService.appSetting.selectedSura.id;
                this.ayaID = this.appService.appSetting.selectedSura.selectedAyaID;
            }

            this.hasBismillah = (this.suraID === 1 || this.suraID === 9) ? false : true;

            if (this.suraID > 0)
                this.getSura();

            this.selectedBookmarks = new Array();

            this.displayContentType = this.appService.appSetting.selectedDisplayContentType;

            this.$scope.$on("$destroy", function () {
                if (_this.appService.autoPlayOn)
                    _this.stop();

                //save to DB
                _this.appService.storeAppSetting();
                //this.mediaService.stop();
            });
        }
        suraController.prototype.getSura = function () {
            var _this = this;
            this.suraService.getSura(this.suraID).then(function (s) {
                s.selectedAyaID = _this.ayaID;
                _this.selectedSura = s;
                _this.appService.appSetting.selectedSura = _this.selectedSura;

                //set bookmarks
                _this.getBookmarkIDs();

                //auto play
                if (_this.appService.autoPlayOn)
                    _this.play();
            });
        };

        suraController.prototype.slideTo = function (ayaID) {
            this.selectedSura.selectedAyaID = this.ayaID = ayaID;
            if (ayaID > +this.selectedSura.numberOfAyas) {
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
        };

        suraController.prototype.play = function (hasUserRequestStop) {
            var _this = this;
            if (this.appService.autoPlayOn && hasUserRequestStop) {
                this.autoPlayOn = this.appService.autoPlayOn = false;
                this.stop();

                //this.mediaService.stop();
                return;
            }

            this.autoPlayOn = this.appService.autoPlayOn = true;

            //** TESTING ONLY ***
            this.intervalObj = this.$interval(function () {
                if (_this.ayaID > 0)
                    _this.ayaID++;
                _this.slideTo(_this.ayaID);
            }, 3000);
            //this.playAudio();
        };

        suraController.prototype.playAudio = function () {
            var _this = this;
            this.mediaService.play(this.ayaID).then(function (res) {
                if (res === 'done') {
                    if (_this.ayaID > 0)
                        _this.ayaID++;

                    _this.slideTo(_this.ayaID);

                    _this.playAudio();
                }
            });
        };

        suraController.prototype.displayContent = function () {
            var displayContent = this.appService.appSetting.selectedDisplayContentType === 'arabic' ? 'translation' : 'arabic';

            this.displayContentType = displayContent;
            this.appService.appSetting.selectedDisplayContentType = displayContent;
            //this.appService.storeAppSetting();
        };

        suraController.prototype.nav = function (moveNext) {
            var currSuraID = +this.selectedSura.id;
            var suraID = moveNext ? currSuraID + 1 : currSuraID - 1;
            suraID = suraID > 114 ? 1 : suraID;

            if (suraID >= 1 && suraID <= 114) {
                var path = '/main/sura/' + suraID;
                this.$location.hash(1);
                this.$location.path(path);
            }
        };

        suraController.prototype.stop = function () {
            if (this.intervalObj)
                this.$interval.cancel(this.intervalObj);
        };

        suraController.prototype.next = function () {
            this.nav(true);
        };

        suraController.prototype.previous = function () {
            this.nav(false);
        };

        suraController.prototype.bookmark = function () {
            this.isBookmarked = true;
            this.bookmarkService.storeBookmark(this.selectedSura);
            this.getBookmarkIDs();
        };

        suraController.prototype.getBookmarkIDs = function () {
            var _this = this;
            var selSuraID = this.selectedSura.id;
            this.bookmarkService.getBookmarks().then(function (bms) {
                _this.selectedBookmarks = _.pluck(_.filter(bms, function (b) {
                    return b.selectedSura.id === selSuraID;
                }), "id");
            });
        };

        //index.html
        suraController.prototype.getSuraIndex = function () {
            var _this = this;
            this.suraService.getSuraMetaData().then(function (s) {
                _this.$scope.vm.suras = s;
            });
        };
     
        suraController.prototype.increaseFontsize = function () {         
            var fontSize = parseInt(this.suraContent.style.fontSize, 10);
            fontSize += this.changeFontStep;
            this.suraContent.style.fontSize = fontSize + 'px';
        };
        
        suraController.prototype.decreaseFontsize = function () {
            var fontSize = parseInt(this.suraContent.style.fontSize, 10);
            fontSize -= this.changeFontStep;
            this.suraContent.style.fontSize = fontSize + 'px';
        };

        suraController.$inject = ['$scope', '$stateParams', '$location', '$interval', '$ionicPlatform', '$ionicScrollDelegate', 'appService', 'suraService', 'bookmarkService', 'mediaService'];
        return suraController;
    })();
    main.suraController = suraController;
})(main || (main = {}));
//angular.module("main.sura", []);
//# sourceMappingURL=suraController.js.map
