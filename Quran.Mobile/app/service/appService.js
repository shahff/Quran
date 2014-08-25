/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
//declare var localforage: lf.ILocalForage<main.model.Reciter>;
var main;
(function (main) {
    "use strict";

    var appService = (function () {
        function appService() {
            var _this = this;
            this.getAppSetting().then(function (app) {
                //if (app == null)
                _this.setDefault();
                //else
                // this.appSetting = app;
            });
        }
        appService.prototype.setDefault = function () {
            var selReciter = new main.model.Reciter();
            selReciter.id = "afasy";
            selReciter.fullName = "Mishary bin Rashid Al-Afasy";
            selReciter.name = "Al-Afasy";
            selReciter.lang = "Arabic";

            var selTranslator = new main.model.Translator();
            selTranslator.id = "en.yusufali";
            selTranslator.lang = "English";
            selTranslator.name = "Yusuf Ali";
            selTranslator.fname = "Abdullah Yusuf Ali";

            var setting = new main.model.AppSetting();
            setting.selectedReciter = selReciter;
            setting.selectedTranslator = selTranslator;

            this.appSetting = setting;
            this.storeAppSetting();
        };

        appService.prototype.storeAppSetting = function () {
            return localforage.setItem("_appSetting", this.appSetting);
        };

        appService.prototype.getAppSetting = function () {
            return localforage.getItem("_appSetting");
        };
        appService.$inject = [];
        return appService;
    })();
    main.appService = appService;
})(main || (main = {}));
//# sourceMappingURL=appService.js.map
