module main {
    "use strict"

    export class suraService {
        static $inject = ['$http', '$q'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        getSuraMetaData(): ng.IPromise<main.model.Sura[]> {

            var deferral = this.$q.defer<main.model.Sura[]>();

            this.$http.get('content/suraData.json', { cache: true }).then(s=> {

                var suras: main.model.Sura[] = [];
                var result = <any>s.data;
                _.each(result.suraIndex, function (i: any) {
                    var d = new main.model.Sura();
                    d.id = i.id;
                    d.name = i.name;
                    d.engName = i.engName;
                    d.transName = i.transName;
                    d.type = i.type;
                    d.numberOfAyas = i.numAyas;
                    d.start = i.start;
                    suras.push(d);
                });

                deferral.resolve(suras);

            }, error=> { deferral.reject(error) });

            return deferral.promise;


        }

        getSuraByID(suraID: number): ng.IPromise<main.model.Sura> {

            var deferral = this.$q.defer<main.model.Sura>();
            this.getSuraMetaData().then(ls=> { 
                var data: main.model.Sura[] = ls;
                var foundSura: main.model.Sura = _.findWhere(data, { id: suraID.toString() });
               
                deferral.resolve(foundSura);

            }, error=> { deferral.reject(error) });

            return deferral.promise;
       }

        getSura(suraID: number): ng.IPromise<main.model.Sura> {

            
            var deferral = this.$q.defer<main.model.Sura>();

            var suraDetails = this.getSuraByID(suraID),
                quranText = this.$http.get('content/quran-simple-enhanced.txt', { cache: true });
            this.$q.all([suraDetails,quranText]).then(results => {
                //this.$http.get('content/quran-simple-enhanced.txt', { cache: true }).then(s => {

                var sura:main.model.Sura = results[0];
                var s = results[1];
                var quranString: string = <string>s.data;
                var csvArray = this.csvToArray(quranString.trim());

                //var entries = [];
                var ayas: main.model.Aya[] = [];

                for (var i = 0; i < csvArray.length; ++i) {
                    var row = csvArray[i];

                         
                    if (row.suraID === suraID.toString()) {
                        if (row.suraID != 1 && row.ayaID < 2)
                            row.content = row.content.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "");
                        
                        var a = new main.model.Aya();
                        a.arabic = row.content;
                        a.ayaID = row.ayaID;
                        ayas.push(a);
                        //entries.push(row);
                    }
                }

                sura.ayas = ayas;

                deferral.resolve(sura);

            }, error=> { deferral.reject(error) });

            return deferral.promise;
        }

        private csvToArray(csvString: any): Array<any> {
            // The array we're going to build
            var csvArray = [];

            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            csvString = csvString.substring(0, csvString.indexOf("#"));

            // Break it into rows to start
            var csvRows = csvString.split(/\n/);
                csvRows = csvRows.filter(function (c) { return c != "" });

            // Take off the first line to get the headers, then split that into an array
            var csvHeaders = ["suraID", "ayaID", "content"];//csvRows.shift().split(';');

            // Loop through remaining rows
            for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
                var rowArray = csvRows[rowIndex].split('|');

                // Create a new row object to store our data.
                var rowObject = csvArray[rowIndex] = {};

                // Then iterate through the remaining properties and use the headers as keys
                for (var propIndex = 0; propIndex < rowArray.length; ++propIndex) {
                    // Grab the value from the row array we're looping through...
                    var propValue = rowArray[propIndex].replace(/^"|"$/g, '');
                    // ...also grab the relevant header (the RegExp in both of these removes quotes)
                    var propLabel = csvHeaders[propIndex].replace(/^"|"$/g, '');;

                    rowObject[propLabel] = propValue;
                }
            }

            return csvArray;
       }

    }
}
