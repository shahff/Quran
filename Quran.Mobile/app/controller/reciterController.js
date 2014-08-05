/// <reference path="../service/reciterservice.ts" />
var main;
(function (main) {
    "use strict";

    var reciterController = (function () {
        function reciterController($scope, reciterService, appService) {
            this.$scope = $scope;
            this.reciterService = reciterService;
            this.appService = appService;
            var that = this;

            $scope.vm = this;

            this.getReciters();

            //set selected Reciter
            this.$scope.vm.selectedReciter = this.appService.appSetting.selectedReciter.name;
        }
        reciterController.prototype.getReciters = function () {
            var _this = this;
            this.reciterService.getReciterMetaData().then(function (s) {
                _this.$scope.vm.reciters = s;
            });
        };

        reciterController.prototype.setReciter = function (selectedItem) {
            this.$scope.vm.selectedReciter = selectedItem.name;

            //store selected
            this.appService.appSetting.selectedReciter = selectedItem;
            this.appService.storeAppSetting();
        };
        reciterController.$inject = ['$scope', 'reciterService', 'appService'];
        return reciterController;
    })();
    main.reciterController = reciterController;
})(main || (main = {}));
//# sourceMappingURL=reciterController.js.map
