var main;
(function (main) {
    "use strict";

    var suraIndexController = (function () {
        function suraIndexController($scope, suraService) {
            this.$scope = $scope;
            this.suraService = suraService;
            var that = this;

            $scope.vm = this;

            this.getSuraIndex();
        }
        suraIndexController.prototype.getSuraIndex = function () {
            var _this = this;
            this.suraService.getSuraMetaData().then(function (s) {
                _this.$scope.vm.suras = s;
            });
        };
        suraIndexController.$inject = ['$scope', 'suraService'];
        return suraIndexController;
    })();
    main.suraIndexController = suraIndexController;
})(main || (main = {}));
//angular.module("main.sura", []);
//# sourceMappingURL=suraIndexController.js.map
