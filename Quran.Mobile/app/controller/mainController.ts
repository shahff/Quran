﻿/// <reference path="../service/translatorservice.ts" />

module main {
    "use strict"

    export class mainController {

        
        public static $inject = ['$scope', '$ionicPlatform', '$location', '$state', 'mediaService', 'appService'];
        constructor(private $scope, private $ionicPlatform, private $location: ng.ILocationService, private $state, private mediaService: mediaService, private appService: appService) {
            var that = this;

            $scope.main = this;

            

            this.$ionicPlatform.registerBackButtonAction(
                 (e)=> {

                     var nav:any = navigator;
                     if (this.$location.url().indexOf("sura/") < 0)
                         this.$state.go('main.sura');
                     else {
                         this.mediaService.stop();
                         nav.app.exitApp();
                     }

                    }, 100
                );

        }

    }
}

