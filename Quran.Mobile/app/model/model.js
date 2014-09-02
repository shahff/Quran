var main;
(function (main) {
    (function (model) {
        "use strict";

        var Aya = (function () {
            function Aya() {
            }
            return Aya;
        })();
        model.Aya = Aya;

        var Sura = (function () {
            function Sura() {
            }
            return Sura;
        })();
        model.Sura = Sura;

        var Reciter = (function () {
            function Reciter() {
            }
            return Reciter;
        })();
        model.Reciter = Reciter;

        var Translator = (function () {
            function Translator() {
            }
            return Translator;
        })();
        model.Translator = Translator;

        //stored in DB
        var AppSetting = (function () {
            function AppSetting() {
            }
            return AppSetting;
        })();
        model.AppSetting = AppSetting;

        var Bookmark = (function () {
            function Bookmark() {
            }
            return Bookmark;
        })();
        model.Bookmark = Bookmark;

        var CONSTANT = (function () {
            function CONSTANT() {
            }
            CONSTANT.appSettingDBKey = '_appSetting';
            CONSTANT.bookmarkDBKey = '_bookmarks';
            CONSTANT.localPersistentPath = 'cdvfile://localhost/persistent/Quran.Mobile/';
            CONSTANT.translationURL = 'http://tanzil.net/trans/';
            CONSTANT.localTranslationPath = 'cdvfile://localhost/persistent/Quran.Mobile/downloads/translation/';
            CONSTANT.localAudioPath = 'cdvfile://localhost/persistent/Quran.Mobile/downloads/audio/';
            return CONSTANT;
        })();
        model.CONSTANT = CONSTANT;
    })(main.model || (main.model = {}));
    var model = main.model;
})(main || (main = {}));
//# sourceMappingURL=model.js.map
