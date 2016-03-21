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

    play() {
        this._http.get('http://minwinpc:5005/Arbeitszimmer/play/' + Date.now()).subscribe(
            null,
            err => console.error(err)
        );
    }

    pause() {
        this._http.get('http://minwinpc:5005/Arbeitszimmer/pause/' + Date.now()).subscribe(
            null,
            err => console.error(err)
        );
    }

    next() {
        this._http.get('http://minwinpc:5005/Arbeitszimmer/next/' + Date.now()).subscribe(
            null,
            err => console.error(err)
        );
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}