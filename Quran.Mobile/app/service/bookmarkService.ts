module main {
    "use strict"

    export class bookmarkService {
        static $inject = ['$http', '$q'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        storeBookmark(selectedSura: main.model.Sura): void {

            this.getBookmarks().then(ls=> {

                var id = selectedSura.id + ":" + selectedSura.selectedAyaID;

                var exists = !_.isEmpty(_.where(ls, { id: id }));
                if (!exists) {

                    ls = ls || [];
                    var selSura: model.Sura = JSON.parse(JSON.stringify(selectedSura));
                    var selectedAya = _.where(selSura.ayas, { ayaID: selectedSura.selectedAyaID });
                    selSura.ayas = selectedAya;

                    var bookmark = new main.model.Bookmark();
                    bookmark.id = id;
                    bookmark.selectedSura = selSura;
                    bookmark.createdDate = new Date().toDateString();
                    ls.push(bookmark);

                    localforage.setItem(model.CONSTANT.bookmarkDBKey, ls);
                    
                }
            });

            
        }

        getBookmarks(): lf.IPromise<main.model.Bookmark[]> {

            return localforage.getItem(model.CONSTANT.bookmarkDBKey);
        }

        removeBookmark(bookmark: model.Bookmark): ng.IPromise<main.model.Bookmark[]>{


            var deferral = this.$q.defer<main.model.Bookmark[]>();
      
            this.getBookmarks().then(ls=> {

                var arrBM: model.Bookmark[] = _.without(ls, _.findWhere(ls, { id: bookmark.id }));
                localforage.setItem(model.CONSTANT.bookmarkDBKey, arrBM);

                deferral.resolve(arrBM);

            });

            return deferral.promise;
        }
    }
}
