/// <reference path="../service/translatorservice.ts" />
var main;
(function (main) {
    "use strict";

    var mainController = (function () {
        function mainController($scope, $timeout, $ionicLoading, appService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$ionicLoading = $ionicLoading;
            this.appService = appService;
            var that = this;

            $scope.main = this;
        }
        mainController.prototype.showBusy = function () {
            // Show the loading overlay and text
            this.$ionicLoading.show({
                template: 'Loading...'
            });
        };

        mainController.prototype.hideBusy = function () {
            this.$ionicLoading.hide();
        };
        mainController.$inject = ['$scope', '$timeout', '$ionicLoading', 'appService'];
        return mainController;
    })();
    main.mainController = mainController;
})(main || (main = {}));
//# sourceMappingURL=mainController.js.map
