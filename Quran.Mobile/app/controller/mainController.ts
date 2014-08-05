/// <reference path="../service/translatorservice.ts" />

module main {
    "use strict"

    export class mainController {

        
        public static $inject = ['$scope', '$timeout', '$ionicLoading', 'appService'];
        constructor(private $scope, private $timeout: ng.ITimeoutService, private $ionicLoading, private appService: appService) {
            var that = this;

            $scope.main = this;

        }

        showBusy(): void {

            // Show the loading overlay and text
            this.$scope.loading = this.$ionicLoading.show({

                // The text to display in the loading indicator
                content: 'Loading',

                // The animation to use
                animation: 'fade-in',

                // Will a dark overlay or backdrop cover the entire view
                showBackdrop: true,

                // The maximum width of the loading indicator
                // Text will be wrapped if longer than maxWidth
                maxWidth: 200,

                // The delay in showing the indicator
                showDelay: 500
            });
        }


        hideBusy(): void {
            this.$ionicLoading.hide();
            //this.$scope.loading.hide();
        }

    }
}

