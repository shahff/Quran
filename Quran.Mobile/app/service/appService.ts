/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
//declare var localforage: lf.ILocalForage<main.model.Reciter>;

module main {
    "use strict"

    export class appService {

        public appSetting: main.model.AppSetting;
        public autoPlayOn: boolean

        static $inject = ['$q'];
        constructor(private $q: ng.IQService) {

            //this.init();
        }

        init(): ng.IPromise<main.model.AppSetting>
        {
                         
            var deferral = this.$q.defer<main.model.AppSetting>();

            this.getAppSetting().then(app => {
                if (app == null) {
                    this.setDefault().then(() => {
                        deferral.resolve(this.appSetting);
                    });
                }
                else {
                    this.appSetting = app
                    deferral.resolve(this.appSetting);
                }
            });

            return deferral.promise;
        }
        
        setDefault(): lf.IPromise<main.model.AppSetting> {

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
            
        }

        storeAppSetting(): lf.IPromise<main.model.AppSetting> {

            return localforage.setItem(model.CONSTANT.appSettingDBKey, this.appSetting);
        }

        getAppSetting(): lf.IPromise<main.model.AppSetting> {

            return localforage.getItem(model.CONSTANT.appSettingDBKey);
        }

        storeDownloadFileName(translatorID: string): void {

            this.getDownloadFileNames().then(ls=> {

                var exists = _.contains(ls, translatorID);
                if (!exists) {

                    ls = ls || [];

                    ls.push(translatorID);

                    localforage.setItem(model.CONSTANT.downloadTranslationDBKey, ls);

                }
            });


        }

        getDownloadFileNames(): lf.IPromise<string[]> {

            return localforage.getItem(model.CONSTANT.downloadTranslationDBKey);
        }


    }
}
