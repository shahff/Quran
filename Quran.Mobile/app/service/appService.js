/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
//declare var localforage: lf.ILocalForage<main.model.Reciter>;
var main;
(function (main) {
    "use strict";

    var appService = (function () {
        function appService($q) {
            this.$q = $q;
            //this.init();
        }
        appService.prototype.init = function () {
            var _this = this;
            var deferral = this.$q.defer();

            this.getAppSetting().then(function (app) {
                if (app == null) {
                    _this.setDefault().then(function () {
                        deferral.resolve(_this.appSetting);
                    });
                } else {
                    _this.appSetting = app;
                    deferral.resolve(_this.appSetting);
                }
            });

            return deferral.promise;
        };

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
            setting.selectedDisplayContentType = 'arabic';

            this.storeDownloadFileName(selTranslator.id);

            this.appSetting = setting;
            return this.storeAppSetting();
        };

        appService.prototype.storeAppSetting = function () {
            return localforage.setItem(main.model.CONSTANT.appSettingDBKey, this.appSetting);
        };

        appService.prototype.getAppSetting = function () {
            return localforage.getItem(main.model.CONSTANT.appSettingDBKey);
        };

        appService.prototype.storeDownloadFileName = function (translatorID) {
            this.getDownloadFileNames().then(function (ls) {
                var exists = _.contains(ls, translatorID);
                if (!exists) {
                    ls = ls || [];

                    ls.push(translatorID);

                    localforage.setItem(main.model.CONSTANT.downloadTranslationDBKey, ls);
                }
            });
        };

        appService.prototype.getDownloadFileNames = function () {
            return localforage.getItem(main.model.CONSTANT.downloadTranslationDBKey);
        };
        appService.$inject = ['$q'];
        return appService;
    })();
    main.appService = appService;
})(main || (main = {}));
//# sourceMappingURL=appService.js.map
