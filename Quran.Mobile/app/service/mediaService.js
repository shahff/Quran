var main;
(function (main) {
    "use strict";

    var mediaService = (function () {
        function mediaService($q, $interval, $ionicPlatform, appService) {
            this.$q = $q;
            this.$interval = $interval;
            this.$ionicPlatform = $ionicPlatform;
            this.appService = appService;
            this.myMedia = null;
            this.isStopRequested = false;
        }
        mediaService.prototype.stop = function () {
            this.myMedia.stop();
            this.myMedia.release();
            this.isStopRequested = true;
        };

        mediaService.prototype.play = function (ayaID) {
            var _this = this;
            var deferral = this.$q.defer();
            this.isStopRequested = false;
            var audioUrl = main.model.CONSTANT.audioURL + this.appService.appSetting.selectedReciter.id + '/' + (("000" + this.appService.appSetting.selectedSura.id).slice(-3) + ("000" + ayaID).slice(-3)) + '.mp3';

            //this.myMedia = new Media(audioUrl, () => { alert('done'); }, (error) => { alert(error) }, (s) => { alert(s); });
            //if (!this.isStopRequested) {
            this.myMedia = new Media(audioUrl, function () {
            }, function (error) {
                deferral.reject(error);
            }, function (mediaStatus) {
                if (mediaStatus == Media.MEDIA_STOPPED) {
                    _this.myMedia.stop();
                    _this.myMedia.release();
                    if (!_this.isStopRequested) {
                        deferral.resolve("done");
                    } else
                        deferral.resolve("stop");
                }
            });

            this.myMedia.play();

            //deferral.resolve("done");
            //}
            //else {
            //  this.stop();
            // deferral.resolve("stop");
            //}
            //***TESTING ONLY***
            //this.$interval(()=> {
            //    deferral.resolve("done");
            //}, 3000);
            return deferral.promise;
        };
        mediaService.$inject = ['$q', '$interval', '$ionicPlatform', 'appService'];
        return mediaService;
    })();
    main.mediaService = mediaService;
})(main || (main = {}));
//# sourceMappingURL=mediaService.js.map
