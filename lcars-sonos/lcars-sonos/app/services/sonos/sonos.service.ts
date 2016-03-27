import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../config';

@Injectable()
export class SonosService {

    _headers: Headers;

    constructor(private _http: Http) {
        this._headers = new Headers({
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
        });
    }

    getZones() {
        return this._http.get(APP_CONFIG.SONOS_API_SERVER + 'zones', {
            headers: this._headers
        })
        .map(res => res.json())
        .catch(this.handleError);
    }

    getZonesPoll() {
        return Observable.interval(5000)
            .switchMap(() => this._http.get(APP_CONFIG.SONOS_API_SERVER + 'zones', {
                headers: this._headers
            }))
            .map((res: Response) => res.json());
    }

    getState(player) {
        return this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/state', {
            headers: this._headers
        })
        .map(res => res.json())
        .catch(this.handleError);
    }

    getStatePoll(player) {
        return Observable.interval(5000)
            .switchMap(() => this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/state', {
                headers: this._headers
            }))
            .map((res: Response) => res.json());
    }

    play(player) {
        this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/play', {
            headers: this._headers
        }).subscribe(
            null,
            err => console.error(err)
        );
    }

    pause(player) {
        this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/pause', {
            headers: this._headers
        }).subscribe(
            null,
            err => console.error(err)
        );
    }

    prev(player) {
        this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/previous', {
            headers: this._headers
        }).subscribe(
            null,
            err => console.error(err)
        );
    }

    next(player) {
        this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/next', {
            headers: this._headers
        }).subscribe(
            null,
            err => console.error(err)
        );
    }

    pauseall() {
        this._http.get(APP_CONFIG.SONOS_API_SERVER + 'pauseall', {
            headers: this._headers
        }).subscribe(
            null,
            err => console.error(err)
        );
    }

    volumeDown(player) {
        this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/volume/-1', {
            headers: this._headers
        }).subscribe(
            null,
            err => console.error(err)
        );
    }

    volumeUp(player) {
        this._http.get(APP_CONFIG.SONOS_API_SERVER + player.roomName + '/volume/+1', {
            headers: this._headers
        }).subscribe(
            null,
            err => console.error(err)
        );
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}