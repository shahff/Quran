var main;
(function (main) {
    "use strict";
})(main || (main = {}));

angular.module("main", ['ionic']).controller("mainController", main.mainController).controller("suraController", main.suraController).controller("suraIndexController", main.suraIndexController).controller("reciterController", main.reciterController).controller("translatorController", main.translatorController).controller("bookmarkController", main.bookmarkController).service("appService", main.appService).service("suraService", main.suraService).service("reciterService", main.reciterService).service("translatorService", main.translatorService).service("bookmarkService", main.bookmarkService).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: "/main",
        abstract: true,
        templateUrl: "app/view/main.html"
    }).state('main.sura', {
        url: "/sura/:id",
        views: {
            'menuContent': {
                templateUrl: "app/view/sura.html",
                controller: 'suraController'
            }
        }
    }).state('main.reciter', {
        url: "/reciter",
        views: {
            'menuContent': {
                templateUrl: "app/view/reciter.html",
                controller: 'reciterController'
            }
        }
    }).state('main.translator', {
        url: "/translator",
        views: {
            'menuContent': {
                templateUrl: "app/view/translator.html",
                controller: 'translatorController'
            }
        }
    }).state('main.index', {
        url: "/index",
        views: {
            'menuContent': {
                templateUrl: "app/view/suraIndex.html",
                controller: 'suraIndexController'
            }
        }
    }).state('main.bookmark', {
        url: "/bookmark",
        views: {
            'menuContent': {
                templateUrl: "app/view/bookmark.html",
                controller: 'bookmarkController'
            }
        }
    });

    $urlRouterProvider.otherwise("/main/sura/");
});
//# sourceMappingURL=app.js.map
