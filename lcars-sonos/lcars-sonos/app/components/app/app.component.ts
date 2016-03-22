import { Component, OnInit } from 'angular2/core';
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

    socket: SocketIOClient.Socket;

    constructor(private _sonosService: SonosService) {
    }

    ngOnInit() {
        //this.socket = io('http://localhost:5007');

        this.getZones();
    }

    getZones() {
        this._sonosService.getZones().subscribe(
            zones => { this.zones = zones }
        );
    }

    select(player) {
        this.selectedPlayer = player;
    }

    play() {
        this._sonosService.play(this.selectedPlayer);
    }

    pause() {
        this.getZones();
        this._sonosService.pause(this.selectedPlayer);
    }

    next() {
        this._sonosService.next(this.selectedPlayer);
    }

    kill() {
        this._sonosService.pauseall();
    }

}