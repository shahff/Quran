/// <reference path="../service/translatorservice.ts" />
var main;
(function (main) {
    "use strict";

    var translatorController = (function () {
        function translatorController($scope, translatorService, appService) {
            this.$scope = $scope;
            this.translatorService = translatorService;
            this.appService = appService;
            this.isDownloaded = false;
            var that = this;

            $scope.vm = this;
            $scope.main.showBusy();

            this.getTranslators();

            //$scope.vm.isDownloaded = this.isDownloaded = true;
            this.selectedTranslator = appService.appSetting.selectedTranslator.name;
        }
        translatorController.prototype.getTranslators = function () {
            var _this = this;
            this.translatorService.getTranslatorMetaData().then(function (s) {
                _this.$scope.vm.translators = s;
                _this.$scope.main.hideBusy();
            });
        };

        translatorController.prototype.setTranslator = function (selectedItem) {
            this.$scope.vm.selectedTranslator = selectedItem.name;
            this.appService.appSetting.selectedTranslator = selectedItem;
            this.appService.storeAppSetting();
        };

        translatorController.prototype.downloadFile = function () {
            this.translatorService.downloadFile('sds');
        };

        translatorController.prototype.readFile = function () {
            this.translatorService.readFile();
        };
        translatorController.$inject = ['$scope', 'translatorService', 'appService'];
        return translatorController;
    })();
    main.translatorController = translatorController;
})(main || (main = {}));
//# sourceMappingURL=translatorController.js.map
