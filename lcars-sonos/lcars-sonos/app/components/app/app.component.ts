﻿import { Component, OnInit } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { SonosService } from '../../services/sonos/sonos.service';

@Component({
    selector: 'app',
    templateUrl: 'app/components/app/app.component.html',
    providers: [HTTP_PROVIDERS, SonosService]
})
export class AppComponent implements OnInit {

    public zones;
    public selectedPlayer;
    public selectedState;

    socket: SocketIOClient.Socket;
    latestStatePoll;

    constructor(private _sonosService: SonosService) {
    }

    ngOnInit() {
        //this.socket = io('http://localhost:5007');

        this.getZonesOnce();
        this.getZonesPoll();
    }

    trackByZones(index: number, zone) {
        return zone.uuid;
    }

    trackByMembers(index: number, member) {
        return member.uuid;
    }

    getZonesOnce() {
        this._sonosService.getZones().subscribe(
            zones => { this.zones = zones }
        );
    }

    getZonesPoll() {
        this._sonosService.getZonesPoll().subscribe(
            zones => { this.zones = zones }
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

    select(player) {
        this.selectedPlayer = player;
        this.selectedState = player.state;
        this.getStatePoll();
    }

    play() {
        this._sonosService.play(this.selectedPlayer);
        this.getStateOnce();
    }

    pause() {
        this._sonosService.pause(this.selectedPlayer);
        this.getStateOnce();
    }

    prev() {
        this._sonosService.prev(this.selectedPlayer);
        this.getStateOnce();
    }

    next() {
        this._sonosService.next(this.selectedPlayer);
        this.getStateOnce();
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

}