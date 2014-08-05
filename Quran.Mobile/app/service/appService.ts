/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
//declare var localforage: lf.ILocalForage<main.model.Reciter>;

module main {
    "use strict"

    export class appService {

        public appSetting: main.model.AppSetting;

        static $inject = [];
        constructor() {

            this.getAppSetting().then(app => {
                if (app == null)
                    this.setDefault();
                else
                   this.appSetting = app;
            });
        }
        
        setDefault(): void {

            var selReciter = new main.model.Reciter();
            selReciter.id = "afasy";
            selReciter.fullName = "Mishary bin Rashid Al-Afasy";
            selReciter.name = "Al-Afasy";
            selReciter.lang = "Arabic";

            var selTranslator = new main.model.Translator();
            selTranslator.id = "en.pickthall";
            selTranslator.lang = "English";
            selTranslator.name = "Pickthall";
            selTranslator.fname = "Mohammed Marmaduke William Pickthall";
      
            var setting = new main.model.AppSetting();
            setting.selectedReciter = selReciter;
            setting.selectedTranslator = selTranslator;

            this.appSetting = setting;
            this.storeAppSetting();
            
        }

        storeAppSetting(): lf.IPromise<main.model.AppSetting> {

            return localforage.setItem("_appSetting", this.appSetting);
        }

        getAppSetting(): lf.IPromise<main.model.AppSetting> {

           return localforage.getItem("_appSetting");
        }

    }
}
