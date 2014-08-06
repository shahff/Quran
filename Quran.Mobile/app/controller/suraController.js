var main;
(function (main) {
    "use strict";

    var suraController = (function () {
        function suraController($scope, $stateParams, $location, $ionicScrollDelegate, appService, suraService) {
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$location = $location;
            this.$ionicScrollDelegate = $ionicScrollDelegate;
            this.appService = appService;
            this.suraService = suraService;
            $scope.vm = this;

            //sample id = 2:85
            this.suraID = 19;
            this.ayaID = 1;

            if (this.$stateParams.id !== "") {
                var suraParam = this.$stateParams.id.split(':');
                this.suraID = +suraParam[0];
                this.ayaID = (suraParam[1] === undefined) ? 1 : +suraParam[1];
            }

            this.hasBismillah = (this.suraID === 1 || this.suraID === 9) ? false : true;

            if (this.suraID > 0)
                this.getSura();
        }
        suraController.prototype.getSura = function () {
            var _this = this;
            this.suraService.getSura(this.suraID).then(function (s) {
                _this.$scope.vm.surasVerses = s;

                //slide to position
                _this.slideTo(_this.ayaID);
            });
        };

        suraController.prototype.slideTo = function (ayaID) {
            if (ayaID > 1) {
                this.$location.hash(ayaID);
                this.$ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(ayaID, true);
            }
        };

        //index.html
        suraController.prototype.getSuraIndex = function () {
            var _this = this;
            this.suraService.getSuraMetaData().then(function (s) {
                _this.$scope.vm.suras = s;
            });
        };
        suraController.$inject = ['$scope', '$stateParams', '$location', '$ionicScrollDelegate', 'appService', 'suraService'];
        return suraController;
    })();
    main.suraController = suraController;
})(main || (main = {}));
//angular.module("main.sura", []);
//# sourceMappingURL=suraController.js.map
