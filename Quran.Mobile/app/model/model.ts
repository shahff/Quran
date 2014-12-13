module main.model {
    "use strict"

    export class Aya {
        ayaID: number;
        arabic: string;
        translation: string;
        transliteration: string;
    }

    export class Sura {
        id: number;
        name: string;
        engName: string;
        transName: string;
        start: number;
        numberOfAyas: number;
        ayas: Array<Aya>;
        selectedAyaID: number;
        type: string;
    }
    
    
    export class Reciter {

        id: string;
        fullName: string;
        name: string;
        lang: string;
    }

    export class Translator {

        id: string;
        imgUrl: string;
        lang: string;
        name: string;
        fname: string;
        url: string;
        isDownloaded: boolean;
        isRTL: boolean;
    }

    //stored in DB
    export class AppSetting {

        selectedReciter: Reciter;
        selectedTranslator: Translator;
        selectedSura: Sura;
        selectedSuraText: string; //sample 03:33
        selectedDisplayContentType: string;
        //selectedPlayOption: boolean;
    }

    export class Bookmark {

        id: string; //sample 03:33
        selectedSura: Sura; //bookmark Aya Stored
        createdDate: string;
    }
    
    export class CONSTANT {

        static appSettingDBKey: string = '_appSetting';
        static bookmarkDBKey: string = '_bookmarks';
        static downloadTranslationDBKey: string = '_translationFileName';
        static localPersistentPath: string = 'cdvfile://localhost/persistent/Quran.Mobile/';
        static translationURL: string = 'http://tanzil.net/trans/';
        static audioURL: string = 'http://tanzil.net/res/audio/';
        static localTranslationFullPath: string = 'cdvfile://localhost/persistent/Quran.Mobile/downloads/translation/';
        static localAudioFullPath: string = 'cdvfile://localhost/persistent/Quran.Mobile/downloads/audio/';
        static localTranslationPath: string = 'Quran.Mobile/downloads/translation';
        
    }

    
}
 