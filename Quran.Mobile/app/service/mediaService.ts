
module main {
    "use strict"

    export class mediaService {

        public myMedia: Media = null;
        public isPlaying: boolean = false;
        public lastAyaID: number = 0;

        static $inject = ['$q','$interval','appService'];
        constructor(private $q: ng.IQService, private $interval, private appService: appService) {

        }

        play(ayaID: number):  ng.IPromise<string> {

            var deferral = this.$q.defer<string>();

            var audioUrl = model.CONSTANT.audioURL + this.appService.appSetting.selectedReciter.id + '/' + (("000" + this.appService.appSetting.selectedSura.id).slice(-3) + ("000" + ayaID).slice(-3)) + '.mp3';
            //this.myMedia = new Media(audioUrl, () => { alert('done'); }, (error) => { alert(error) }, (s) => { alert(s); });

            //if (!this.isPlaying) {
            //    this.myMedia = new Media(audioUrl, () => { /*alert('success');*/ }, (error) => { deferral.reject(error) }, (mediaStatus: number) => {
            //        if (mediaStatus == Media.MEDIA_STOPPED) {
            //            this.myMedia.stop();
            //            this.myMedia.release();
            //            this.isPlaying = false;
            //            deferral.resolve("done");
            //        }
            //    });

            //    this.myMedia.play();
            //    this.isPlaying = true;
            //    this.lastAyaID = ayaID;
            //}
            //else {
            //    this.myMedia.stop();
            //    this.myMedia.release();
            //    this.isPlaying = false;
            //    this.lastAyaID = 0;
            //    deferral.resolve("stop");
            //}

            this.$interval(()=> {
                deferral.resolve("done");
            }, 3000);
            

            return deferral.promise;

        }
         

    }
}
