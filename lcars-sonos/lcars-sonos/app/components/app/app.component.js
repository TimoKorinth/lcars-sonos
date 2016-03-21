System.register(['angular2/core', 'angular2/http', '../../services/sonos/sonos.service'], function(exports_1, context_1) {
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
    var core_1, http_1, sonos_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (sonos_service_1_1) {
                sonos_service_1 = sonos_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_http, _sonosService) {
                    this._http = _http;
                    this._sonosService = _sonosService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getZones();
                };
                AppComponent.prototype.getZones = function () {
                    var _this = this;
                    this._sonosService.getZones().then(function (zones) { return _this.zones = zones; });
                };
                AppComponent.prototype.play = function () {
                    this._http.get('http://minwinpc:5005/Arbeitszimmer/play/' + Date.now()).subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); });
                };
                AppComponent.prototype.pause = function () {
                    this._http.get('http://minwinpc:5005/Arbeitszimmer/pause/' + Date.now()).subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); });
                };
                AppComponent.prototype.next = function () {
                    this._http.get('http://minwinpc:5005/Arbeitszimmer/next/' + Date.now()).subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/components/app/app.component.html',
                        providers: [http_1.HTTP_BINDINGS, sonos_service_1.SonosService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, sonos_service_1.SonosService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map