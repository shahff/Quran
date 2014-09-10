var main;
(function (main) {
    "use strict";

    var bookmarkService = (function () {
        function bookmarkService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        bookmarkService.prototype.storeBookmark = function (selectedSura) {
            this.getBookmarks().then(function (ls) {
                var id = selectedSura.id + ":" + selectedSura.selectedAyaID;

                var exists = !_.isEmpty(_.where(ls, { id: id }));
                if (!exists) {
                    ls = ls || [];
                    var selSura = JSON.parse(JSON.stringify(selectedSura));
                    var selectedAya = _.where(selSura.ayas, { ayaID: selectedSura.selectedAyaID });
                    selSura.ayas = selectedAya;

                    var bookmark = new main.model.Bookmark();
                    bookmark.id = id;
                    bookmark.selectedSura = selSura;
                    bookmark.createdDate = new Date().toDateString();
                    ls.push(bookmark);

                    localforage.setItem(main.model.CONSTANT.bookmarkDBKey, ls);
                }
            });
        };

        bookmarkService.prototype.getBookmarks = function () {
            return localforage.getItem(main.model.CONSTANT.bookmarkDBKey);
        };

        bookmarkService.prototype.removeBookmark = function (bookmark) {
            var deferral = this.$q.defer();

            this.getBookmarks().then(function (ls) {
                var arrBM = _.without(ls, _.findWhere(ls, { id: bookmark.id }));
                localforage.setItem(main.model.CONSTANT.bookmarkDBKey, arrBM);

                deferral.resolve(arrBM);
            });

            return deferral.promise;
        };
        bookmarkService.$inject = ['$http', '$q'];
        return bookmarkService;
    })();
    main.bookmarkService = bookmarkService;
})(main || (main = {}));
//# sourceMappingURL=bookmarkService.js.map
