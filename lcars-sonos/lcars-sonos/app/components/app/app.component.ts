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

    constructor(private _sonosService: SonosService) {
    }

    ngOnInit() {
        this.getZones();
    }

    getZones() {
        this._sonosService.getZones().subscribe(
            zones => { this.zones = zones }
        );
    }

    play() {
        this._sonosService.play();
    }

    pause() {
        this.getZones();
        this._sonosService.pause();
    }

    next() {
        this._sonosService.next();
    }

}