/// <reference path="../service/translatorservice.ts" />

module main {
    "use strict"

    export class mainController {

        
        public static $inject = ['$scope', '$timeout', '$ionicLoading', 'appService'];
        constructor(private $scope, private $timeout: ng.ITimeoutService, private $ionicLoading, private appService: appService) {
            var that = this;

            $scope.main = this;

        }

        //showBusy(): void {

        //    // Show the loading overlay and text
        //    this.$ionicLoading.show({
        //            template: 'Loading...'
        //        });
        //}


        //hideBusy(): void {
        //    this.$ionicLoading.hide();
        //}

    }
}

