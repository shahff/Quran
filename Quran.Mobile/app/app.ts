module main{
    "use strict"
    
}

angular.module("main", ['ionic'])
    .controller("mainController", main.mainController)
    .controller("suraController", main.suraController)
    .controller("suraIndexController", main.suraIndexController)
    .controller("reciterController", main.reciterController)
    .controller("translatorController", main.translatorController)
    .controller("bookmarkController", main.bookmarkController)

    .service("appService", main.appService)
    .service("suraService", main.suraService)
    .service("reciterService", main.reciterService)
    .service("translatorService", main.translatorService)
    .service("bookmarkService", main.bookmarkService)
    .service("mediaService", main.mediaService)


    //.run(function ($ionicPlatform) {
    //    $ionicPlatform.ready(function () {
    //        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    //        // for form inputs)
    //        if (window.cordova && window.cordova.plugins.Keyboard) {
    //            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //        }
    //        if (window.StatusBar) {
    //            // org.apache.cordova.statusbar required
    //            StatusBar.styleDefault();
    //        }
    //    });
    //})

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
        $stateProvider

            .state('main', {
                url: "/main",
                abstract: true,
                templateUrl: "app/view/main.html",
                controller: "mainController",
                resolve: {
                    appSetting: function (appService) {
                    return appService.init();
                }
            }
            })

            .state('main.sura', {
                url: "/sura/:id",
                views: {
                    'menuContent': {
                        templateUrl: "app/view/sura.html",
                        controller: 'suraController'
                    }
                }
            })

            .state('main.reciter', {
                url: "/reciter",
                views: {
                    'menuContent': {
                        templateUrl: "app/view/reciter.html",
                        controller: 'reciterController'
                    }
                }
            })

            .state('main.translator', {
                url: "/translator",
                views: {
                    'menuContent': {
                        templateUrl: "app/view/translator.html",
                        controller: 'translatorController'
                    }
                }
            })
            .state('main.index', {
                url: "/index",
                views: {
                    'menuContent': {
                        templateUrl: "app/view/suraIndex.html",
                        controller: 'suraIndexController'
                    }
                }
            })
            .state('main.bookmark', {
                url: "/bookmark",
                views: {
                    'menuContent': {
                        templateUrl: "app/view/bookmark.html",
                        controller: 'bookmarkController'
                    }
                }
            })

        $urlRouterProvider.otherwise("/main/sura/");
    });