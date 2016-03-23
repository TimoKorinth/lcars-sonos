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
                function AppComponent(_sonosService) {
                    this._sonosService = _sonosService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    //this.socket = io('http://localhost:5007');
                    this.getZonesOnce();
                    this.getZonesPoll();
                };
                AppComponent.prototype.trackByZones = function (index, zone) {
                    return zone.uuid;
                };
                AppComponent.prototype.trackByMembers = function (index, member) {
                    return member.uuid;
                };
                AppComponent.prototype.getZonesOnce = function () {
                    var _this = this;
                    this._sonosService.getZones().subscribe(function (zones) { _this.zones = zones; });
                };
                AppComponent.prototype.getZonesPoll = function () {
                    var _this = this;
                    this._sonosService.getZonesPoll().subscribe(function (zones) { _this.zones = zones; });
                };
                AppComponent.prototype.getState = function () {
                    var _this = this;
                    if (this.latestStatePoll) {
                        this.latestStatePoll.unsubscribe();
                    }
                    this.latestStatePoll = this._sonosService.getStatePoll(this.selectedPlayer).subscribe(function (state) { _this.selectedState = state; });
                };
                AppComponent.prototype.select = function (player) {
                    this.selectedPlayer = player;
                    this.selectedState = player.state;
                    this.getState();
                };
                AppComponent.prototype.play = function () {
                    this._sonosService.play(this.selectedPlayer);
                };
                AppComponent.prototype.pause = function () {
                    this._sonosService.pause(this.selectedPlayer);
                };
                AppComponent.prototype.prev = function () {
                    this._sonosService.prev(this.selectedPlayer);
                };
                AppComponent.prototype.next = function () {
                    this._sonosService.next(this.selectedPlayer);
                };
                AppComponent.prototype.kill = function () {
                    this._sonosService.pauseall();
                };
                AppComponent.prototype.volumeDown = function () {
                    this._sonosService.volumeDown(this.selectedPlayer);
                };
                AppComponent.prototype.volumeUp = function () {
                    this._sonosService.volumeUp(this.selectedPlayer);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/components/app/app.component.html',
                        providers: [http_1.HTTP_PROVIDERS, sonos_service_1.SonosService]
                    }), 
                    __metadata('design:paramtypes', [sonos_service_1.SonosService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map