System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var SonosService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            SonosService = (function () {
                function SonosService(_http) {
                    this._http = _http;
                }
                SonosService.prototype.getZones = function () {
                    return this._http.get('http://minwinpc:5005/zones')
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                SonosService.prototype.getZonesPoll = function () {
                    var _this = this;
                    return Observable_1.Observable.interval(5000)
                        .switchMap(function () { return _this._http.get('http://minwinpc:5005/zones'); })
                        .map(function (res) { return res.json(); });
                };
                SonosService.prototype.getStatePoll = function (player) {
                    var _this = this;
                    return Observable_1.Observable.interval(5000)
                        .switchMap(function () { return _this._http.get('http://minwinpc:5005/' + player.roomName + '/state'); })
                        .map(function (res) { return res.json(); });
                };
                SonosService.prototype.play = function (player) {
                    this._http.get('http://minwinpc:5005/' + player.roomName + '/play').subscribe(null, function (err) { return console.error(err); });
                };
                SonosService.prototype.pause = function (player) {
                    this._http.get('http://minwinpc:5005/' + player.roomName + '/pause').subscribe(null, function (err) { return console.error(err); });
                };
                SonosService.prototype.prev = function (player) {
                    this._http.get('http://minwinpc:5005/' + player.roomName + '/previous').subscribe(null, function (err) { return console.error(err); });
                };
                SonosService.prototype.next = function (player) {
                    this._http.get('http://minwinpc:5005/' + player.roomName + '/next').subscribe(null, function (err) { return console.error(err); });
                };
                SonosService.prototype.pauseall = function () {
                    this._http.get('http://minwinpc:5005/pauseall').subscribe(null, function (err) { return console.error(err); });
                };
                SonosService.prototype.volumeDown = function (player) {
                    this._http.get('http://minwinpc:5005/' + player.roomName + '/volume/-5').subscribe(null, function (err) { return console.error(err); });
                };
                SonosService.prototype.volumeUp = function (player) {
                    this._http.get('http://minwinpc:5005/' + player.roomName + '/volume/+5').subscribe(null, function (err) { return console.error(err); });
                };
                SonosService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                SonosService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SonosService);
                return SonosService;
            }());
            exports_1("SonosService", SonosService);
        }
    }
});
//# sourceMappingURL=sonos.service.js.map