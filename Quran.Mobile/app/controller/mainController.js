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
            this.$scope.loading = this.$ionicLoading.show({
                // The text to display in the loading indicator
                content: 'Loading',
                // The animation to use
                animation: 'fade-in',
                // Will a dark overlay or backdrop cover the entire view
                showBackdrop: true,
                // The maximum width of the loading indicator
                // Text will be wrapped if longer than maxWidth
                maxWidth: 200,
                // The delay in showing the indicator
                showDelay: 500
            });
        };

        mainController.prototype.hideBusy = function () {
            this.$ionicLoading.hide();
            //this.$scope.loading.hide();
        };
        mainController.$inject = ['$scope', '$timeout', '$ionicLoading', 'appService'];
        return mainController;
    })();
    main.mainController = mainController;
})(main || (main = {}));
//# sourceMappingURL=mainController.js.map
