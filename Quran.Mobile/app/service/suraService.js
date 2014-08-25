var main;
(function (main) {
    "use strict";

    var suraService = (function () {
        function suraService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        suraService.prototype.getSuraMetaData = function () {
            var deferral = this.$q.defer();

            this.$http.get('content/suraData.json', { cache: true }).then(function (s) {
                var suras = [];
                var result = s.data;
                _.each(result.suraIndex, function (i) {
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
            }, function (error) {
                deferral.reject(error);
            });

            return deferral.promise;
        };

        suraService.prototype.getSuraByID = function (suraID) {
            var deferral = this.$q.defer();
            this.getSuraMetaData().then(function (ls) {
                var data = ls;
                var foundSura = _.findWhere(data, { id: suraID.toString() });

                deferral.resolve(foundSura);
            }, function (error) {
                deferral.reject(error);
            });

            return deferral.promise;
        };

        suraService.prototype.getSura = function (suraID, selectedTranslatorID) {
            var _this = this;
            selectedTranslatorID = 'en.yusufali';

            var deferral = this.$q.defer();

            var suraDetails = this.getSuraByID(suraID), quranText = this.$http.get('content/quran-simple-enhanced.txt', { cache: true }), translationText = this.$http.get('content/' + selectedTranslatorID + '.txt', { cache: true });

            this.$q.all([suraDetails, quranText, translationText]).then(function (results) {
                var sura = results[0];
                var quranString = results[1].data;
                var translationString = results[2].data;
                var quranArray = _this.csvToArray(quranString.trim());
                var translationArray = _this.csvToArray(translationString.trim());

                var translationSura = _.where(translationArray, { suraID: suraID.toString() });

                //var entries = [];
                var ayas = [];

                for (var i = 0; i < quranArray.length; ++i) {
                    var row = quranArray[i];

                    if (row.suraID === suraID.toString()) {
                        if (row.suraID != 1 && row.ayaID < 2)
                            row.content = row.content.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "");

                        var a = new main.model.Aya();
                        a.arabic = row.content;
                        a.ayaID = row.ayaID;
                        var trans = _.where(translationSura, { ayaID: row.ayaID });
                        a.translation = trans[0].content;
                        ayas.push(a);
                        //entries.push(row);
                    }
                }

                sura.ayas = ayas;

                deferral.resolve(sura);
            }, function (error) {
                deferral.reject(error);
            });

            return deferral.promise;
        };

        suraService.prototype.csvToArray = function (csvString) {
            // The array we're going to build
            var csvArray = [];

            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
            csvString = csvString.substring(0, csvString.indexOf("#"));

            // Break it into rows to start
            var csvRows = csvString.split(/\n/);
            csvRows = csvRows.filter(function (c) {
                return c != "";
            });

            // Take off the first line to get the headers, then split that into an array
            var csvHeaders = ["suraID", "ayaID", "content"];

            for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
                var rowArray = csvRows[rowIndex].split('|');

                // Create a new row object to store our data.
                var rowObject = csvArray[rowIndex] = {};

                for (var propIndex = 0; propIndex < rowArray.length; ++propIndex) {
                    // Grab the value from the row array we're looping through...
                    var propValue = rowArray[propIndex].replace(/^"|"$/g, '');

                    // ...also grab the relevant header (the RegExp in both of these removes quotes)
                    var propLabel = csvHeaders[propIndex].replace(/^"|"$/g, '');
                    ;

                    rowObject[propLabel] = propValue;
                }
            }

            return csvArray;
        };
        suraService.$inject = ['$http', '$q'];
        return suraService;
    })();
    main.suraService = suraService;
})(main || (main = {}));
//# sourceMappingURL=suraService.js.map
