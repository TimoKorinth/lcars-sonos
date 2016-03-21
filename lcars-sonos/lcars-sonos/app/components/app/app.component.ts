import { Component, OnInit } from 'angular2/core';
import { Http, HTTP_BINDINGS } from 'angular2/http';
import { SonosService } from '../../services/sonos/sonos.service';

@Component({
    selector: 'app',
    templateUrl: 'app/components/app/app.component.html',
    providers: [HTTP_BINDINGS, SonosService]
})
export class AppComponent implements OnInit {

    public zones;

    constructor(private _http: Http, private _sonosService: SonosService) {
    }

    ngOnInit() {
        this.getZones();
    }

    getZones() {
        this._sonosService.getZones().then(zones => this.zones = zones);
    }

    play() {
        this._http.get('http://minwinpc:5005/Arbeitszimmer/play/' + Date.now()).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
    }

    pause() {
        this._http.get('http://minwinpc:5005/Arbeitszimmer/pause/' + Date.now()).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
    }

    next() {
        this._http.get('http://minwinpc:5005/Arbeitszimmer/next/' + Date.now()).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
    }

}