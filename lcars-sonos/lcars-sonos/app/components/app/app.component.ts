import { Component } from 'angular2/core';
import { Http, HTTP_BINDINGS } from 'angular2/http';

@Component({
    selector: 'app',
    templateUrl: 'app/components/app/app.component.html',
    providers: [HTTP_BINDINGS]
})
export class AppComponent {

    constructor(private http: Http) {

    }

    play() {
        this.http.get('http://minwinpc:5005/Arbeitszimmer/play/' + Date.now()).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
    }

    pause() {
        this.http.get('http://minwinpc:5005/Arbeitszimmer/pause/' + Date.now()).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
    }

    next() {
        this.http.get('http://minwinpc:5005/Arbeitszimmer/next/' + Date.now()).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
    }

}