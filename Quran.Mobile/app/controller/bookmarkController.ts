/// <reference path="../service/reciterservice.ts" />

module main {
    "use strict"

    export class bookmarkController {

        public bookmarks: main.model.Bookmark[];

        public static $inject = ['$scope', 'bookmarkService'];
        constructor(private $scope, private bookmarkService: bookmarkService) {
            var that = this;

            $scope.vm = this;

            this.getBookmarks();

        }

        getBookmarks(): void {

            this.bookmarkService.getBookmarks().then((b) => {
                this.bookmarks = b;
                this.$scope.$apply();
            });
        }

        removeBookmark(bookmark: model.Bookmark): void {

            this.bookmarkService.removeBookmark(bookmark).then(b=> {
                this.bookmarks = b;
            });
        }
        

    }
}

