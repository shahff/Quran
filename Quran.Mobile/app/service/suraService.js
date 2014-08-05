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

        suraService.prototype.getSura = function (suraID) {
            var _this = this;
            var deferral = this.$q.defer();

            var suraDetails = this.getSuraByID(suraID), quranText = this.$http.get('content/quran-simple-enhanced.txt', { cache: true });
            this.$q.all([suraDetails, quranText]).then(function (results) {
                //this.$http.get('content/quran-simple-enhanced.txt', { cache: true }).then(s => {
                var sura = results[0];
                var s = results[1];
                var quranString = s.data;
                var csvArray = _this.csvToArray(quranString.trim());

                //var entries = [];
                var ayas = [];

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
