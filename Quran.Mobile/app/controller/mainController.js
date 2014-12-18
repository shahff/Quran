/// <reference path="../service/translatorservice.ts" />
var main;
(function (main) {
    "use strict";

    var mainController = (function () {
        function mainController($scope, $ionicPlatform, $location, $state, mediaService, appService) {
            var _this = this;
            this.$scope = $scope;
            this.$ionicPlatform = $ionicPlatform;
            this.$location = $location;
            this.$state = $state;
            this.mediaService = mediaService;
            this.appService = appService;
            var that = this;

            $scope.main = this;

            this.$ionicPlatform.registerBackButtonAction(function (e) {
                var nav = navigator;
                if (_this.$location.url().indexOf("sura/") < 0)
                    _this.$state.go('main.sura');
                else {
                    _this.mediaService.stop();
                    nav.app.exitApp();
                }
            }, 100);
        }
        mainController.$inject = ['$scope', '$ionicPlatform', '$location', '$state', 'mediaService', 'appService'];
        return mainController;
    })();
    main.mainController = mainController;
})(main || (main = {}));
//# sourceMappingURL=mainController.js.map
