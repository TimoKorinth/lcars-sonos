import { Component, OnInit } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { SonosService } from '../../services/sonos/sonos.service';
import { FlickrService } from '../../services/flickr/flickr.service';
import { APP_CONFIG } from '../../config';

@Component({
    selector: 'app',
    templateUrl: 'app/components/app/app.component.html',
    providers: [HTTP_PROVIDERS, SonosService, FlickrService]
})
export class AppComponent implements OnInit {

    public zones;
    public selectedPlayer;
    public selectedState;
    public showFlickrPhotoFrame: boolean;
    public currentFlickrPhoto;
    
    latestStatePoll;
    latestPhotoPoll;

    constructor(private _sonosService: SonosService, private _flickrService: FlickrService) {
    }

    ngOnInit() {
        this.getZonesOnce();

        if (APP_CONFIG.USE_WEBSOCKET_EVENTS) {
            this.getZonesPush();
        } else {
            this.getZonesPoll();
        }        
    }

    trackByZones(index: number, zone) {
        return zone.uuid;
    }

    trackByMembers(index: number, member) {
        return member.uuid;
    }

    getZonesOnce() {
        this._sonosService.getZones().subscribe(
            zones => {
                this.zones = zones;
                if (this.selectedPlayer) {
                    for (let zone of this.zones) {
                        for (let member of zone.members) {
                            if (member.uuid === this.selectedPlayer.uuid) {
                                this.selectedPlayer = member;
                                this.selectedState = member.state;
                            }
                        }
                    }
                }
            }
        );
    }

    getZonesPoll() {
        this._sonosService.getZonesPoll().subscribe(
            zones => { this.zones = zones }
        );
    }

    getZonesPush() {
        this._sonosService.getZonesPush().subscribe(
            result => { this.zones = result.data }
        );
    }

    getStateOnce() {
        this._sonosService.getState(this.selectedPlayer).subscribe(
            state => { this.selectedState = state }
        );
    }

    getStatePoll() {
        if (this.latestStatePoll) {
            this.latestStatePoll.unsubscribe();
        }

        this.latestStatePoll = this._sonosService.getStatePoll(this.selectedPlayer).subscribe(
            state => { this.selectedState = state }
        );
    }

    getStatePush() {
        if (this.latestStatePoll) {
            this.latestStatePoll.unsubscribe();
        }

        this.latestStatePoll = this._sonosService.getStatePush().subscribe(
            result => {
                this.getZonesOnce();
                //if (result.data.coordinator === this.selectedPlayer.coordinator) {
                //    this.selectedState = result.data.state;
                //}

                //for (let zone of this.zones) {
                //    for (let member of zone.members) {
                //        if (member.coordinator === result.data.coordinator) {
                //            member.state = result.data.state;
                //        }
                //    }
                //}
            }
        );
    }

    select(player) {
        this.selectedPlayer = player;
        this.selectedState = player.state;

        if (APP_CONFIG.USE_WEBSOCKET_EVENTS) {
            this.getStatePush();
        } else {
            this.getStatePoll();
        }        
    }

    play() {
        this._sonosService.play(this.selectedPlayer);
    }

    pause() {
        this._sonosService.pause(this.selectedPlayer);
    }

    prev() {
        this._sonosService.prev(this.selectedPlayer);
    }

    next() {
        this._sonosService.next(this.selectedPlayer);
    }

    kill() {
        this._sonosService.pauseall();
    }

    volumeDown() {
        this._sonosService.volumeDown(this.selectedPlayer);
        this.getStateOnce();
    }

    volumeUp() {
        this._sonosService.volumeUp(this.selectedPlayer);
        this.getStateOnce();
    }

    showFlickr() {
        this.showFlickrPhotoFrame = true;
        this.latestPhotoPoll = this._flickrService.getRandomPhotoPoll().subscribe(
            photo => { this.currentFlickrPhoto = photo }
        );
    }

    hideFlickr() {
        this.showFlickrPhotoFrame = false;

        if (this.latestPhotoPoll) {
            this.latestPhotoPoll.unsubscribe();
        }
    }
}