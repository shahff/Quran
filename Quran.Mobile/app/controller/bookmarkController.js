/// <reference path="../service/reciterservice.ts" />
var main;
(function (main) {
    "use strict";

    var bookmarkController = (function () {
        function bookmarkController($scope, bookmarkService) {
            this.$scope = $scope;
            this.bookmarkService = bookmarkService;
            var that = this;

            $scope.vm = this;

            this.getBookmarks();
        }
        bookmarkController.prototype.getBookmarks = function () {
            var _this = this;
            this.bookmarkService.getBookmarks().then(function (b) {
                _this.bookmarks = b;
                _this.$scope.$apply();
            });
        };

        bookmarkController.prototype.removeBookmark = function (bookmark) {
            var _this = this;
            this.bookmarkService.removeBookmark(bookmark).then(function (b) {
                _this.bookmarks = b;
            });
        };
        bookmarkController.$inject = ['$scope', 'bookmarkService'];
        return bookmarkController;
    })();
    main.bookmarkController = bookmarkController;
})(main || (main = {}));
//# sourceMappingURL=bookmarkController.js.map
