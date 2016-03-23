import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SonosService {

    constructor(private _http: Http) {

    }

    getZones() {
        return this._http.get('http://minwinpc:5005/zones')
            .map(res => res.json())
            .catch(this.handleError);
    }

    getZonesPoll() {
        return Observable.interval(5000)
            .switchMap(() => this._http.get('http://minwinpc:5005/zones'))
            .map((res: Response) => res.json());
    }

    getStatePoll(player) {
        return Observable.interval(5000)
            .switchMap(() => this._http.get('http://minwinpc:5005/' + player.roomName + '/state'))
            .map((res: Response) => res.json());
    }

    play(player) {
        this._http.get('http://minwinpc:5005/' + player.roomName + '/play').subscribe(
            null,
            err => console.error(err)
        );
    }

    pause(player) {
        this._http.get('http://minwinpc:5005/' + player.roomName + '/pause').subscribe(
            null,
            err => console.error(err)
        );
    }

    prev(player) {
        this._http.get('http://minwinpc:5005/' + player.roomName + '/previous').subscribe(
            null,
            err => console.error(err)
        );
    }

    next(player) {
        this._http.get('http://minwinpc:5005/' + player.roomName + '/next').subscribe(
            null,
            err => console.error(err)
        );
    }

    pauseall() {
        this._http.get('http://minwinpc:5005/pauseall').subscribe(
            null,
            err => console.error(err)
        );
    }

    volumeDown(player) {
        this._http.get('http://minwinpc:5005/' + player.roomName + '/volume/-5').subscribe(
            null,
            err => console.error(err)
        );
    }

    volumeUp(player) {
        this._http.get('http://minwinpc:5005/' + player.roomName + '/volume/+5').subscribe(
            null,
            err => console.error(err)
        );
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}