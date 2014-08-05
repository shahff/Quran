module main.model {
    "use strict"

    export class Aya {
        ayaID: number;
        arabic: string;
        english: string;
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
    }

    export class AppSetting {

        selectedReciter: Reciter;
        selectedTranslator: Translator;
        selectedSura: Sura;
        selectedSuraText: string; //sample 03:33
    }

    
    
}
 