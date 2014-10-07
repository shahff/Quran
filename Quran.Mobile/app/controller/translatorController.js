/// <reference path="../service/translatorservice.ts" />
var main;
(function (main) {
    "use strict";

    var translatorController = (function () {
        function translatorController($scope, $q, $ionicLoading, translatorService, appService) {
            this.$scope = $scope;
            this.$q = $q;
            this.$ionicLoading = $ionicLoading;
            this.translatorService = translatorService;
            this.appService = appService;
            $scope.vm = this;
            this.$ionicLoading.show({ template: 'Loading...' });

            this.getTranslators();

            this.selectedTranslator = appService.appSetting.selectedTranslator.name;
        }
        translatorController.prototype.getTranslators = function () {
            var _this = this;
            this.translatorService.getTranslatorMetaData().then(function (s) {
                _this.translators = s;
                _this.getFileNames();

                _this.$ionicLoading.hide();
            });
        };

        translatorController.prototype.setTranslator = function (selectedItem) {
            this.selectedTranslator = selectedItem.name;
            this.appService.appSetting.selectedTranslator = selectedItem;
            this.appService.storeAppSetting();
        };

        translatorController.prototype.downloadFile = function () {
            this.translatorService.downloadFile('sds');
        };

        translatorController.prototype.getFileNames = function () {
            var _this = this;
            this.appService.getDownloadFileNames().then(function (fns) {
                _.each(fns, function (f) {
                    var transFound = _.findWhere(_this.translators, { id: f });
                    transFound.isDownloaded = true;
                });
                _this.$scope.$apply();
            });
        };

        translatorController.prototype.readFile = function () {
            this.translatorService.readFile();
        };
        translatorController.$inject = ['$scope', '$q', '$ionicLoading', 'translatorService', 'appService'];
        return translatorController;
    })();
    main.translatorController = translatorController;
})(main || (main = {}));
//# sourceMappingURL=translatorController.js.map
