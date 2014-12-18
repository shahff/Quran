
module main {
    "use strict"

    export class mediaService {

        public myMedia: Media = null;
        public isStopRequested: boolean = false;

        static $inject = ['$q', '$interval','$ionicPlatform','appService'];
        constructor(private $q: ng.IQService, private $interval, private $ionicPlatform, private appService: appService) {

        }


        stop(): void {
            this.myMedia.stop();
            this.myMedia.release();
            this.isStopRequested = true;
        }

        play(ayaID: number):  ng.IPromise<string> {

            var deferral = this.$q.defer<string>();
            this.isStopRequested = false;
            var audioUrl = model.CONSTANT.audioURL + this.appService.appSetting.selectedReciter.id + '/' + (("000" + this.appService.appSetting.selectedSura.id).slice(-3) + ("000" + ayaID).slice(-3)) + '.mp3';
            //this.myMedia = new Media(audioUrl, () => { alert('done'); }, (error) => { alert(error) }, (s) => { alert(s); });

            //if (!this.isStopRequested) {
                this.myMedia = new Media(audioUrl, () => { /*alert('success');*/ }, (error) => { deferral.reject(error) }, (mediaStatus: number) => {
                    if (mediaStatus == Media.MEDIA_STOPPED) {
                        this.myMedia.stop();
                        this.myMedia.release();
                        if (!this.isStopRequested) {
                            deferral.resolve("done");
                        } else deferral.resolve("stop");
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

        }
         

            //    loadMedia(src, onError, onStatus, onStop): ng.IPromise<string>  {
    //        var deferral = this.$q.defer<string>();

        
    //    this.$ionicPlatform.ready(() =>{
    //        var mediaSuccess = () =>{
    //            if (onStop) {
    //                onStop();
    //            }
    //        };
    //        var mediaError = (err) => {
    //            //_logError(src, err);
    //            if (onError) {
    //                onError(err);
    //            }
    //        };
    //        var mediaStatus = (status) => {
    //            if (onStatus) {
    //                onStatus(status);
    //            }
    //        };

    //        deferral.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
    //    });
    //        return deferral.promise;
    //}







    }
}
