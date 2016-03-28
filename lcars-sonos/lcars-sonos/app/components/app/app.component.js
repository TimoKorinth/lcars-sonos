System.register(['angular2/core', 'angular2/http', '../../services/sonos/sonos.service', '../../services/flickr/flickr.service', '../../config'], function(exports_1, context_1) {
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
    var core_1, http_1, sonos_service_1, flickr_service_1, config_1;
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
            },
            function (flickr_service_1_1) {
                flickr_service_1 = flickr_service_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_sonosService, _flickrService) {
                    this._sonosService = _sonosService;
                    this._flickrService = _flickrService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getZonesOnce();
                    if (config_1.APP_CONFIG.USE_WEBSOCKET_EVENTS) {
                        this.getZonesPush();
                    }
                    else {
                        this.getZonesPoll();
                    }
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
                AppComponent.prototype.getZonesPush = function () {
                    var _this = this;
                    this._sonosService.getZonesPush().subscribe(function (result) { _this.zones = result.data; });
                };
                AppComponent.prototype.getStateOnce = function () {
                    var _this = this;
                    this._sonosService.getState(this.selectedPlayer).subscribe(function (state) { _this.selectedState = state; });
                };
                AppComponent.prototype.getStatePoll = function () {
                    var _this = this;
                    if (this.latestStatePoll) {
                        this.latestStatePoll.unsubscribe();
                    }
                    this.latestStatePoll = this._sonosService.getStatePoll(this.selectedPlayer).subscribe(function (state) { _this.selectedState = state; });
                };
                AppComponent.prototype.getStatePush = function () {
                    var _this = this;
                    if (this.latestStatePoll) {
                        this.latestStatePoll.unsubscribe();
                    }
                    this.latestStatePoll = this._sonosService.getStatePush().subscribe(function (result) {
                        if (result.data.uuid === _this.selectedPlayer.uuid) {
                            _this.selectedState = result.data.state;
                        }
                        for (var _i = 0, _a = _this.zones; _i < _a.length; _i++) {
                            var zone = _a[_i];
                            for (var _b = 0, _c = zone.members; _b < _c.length; _b++) {
                                var member = _c[_b];
                                if (member.uuid === result.data.uuid) {
                                    member.state = result.data.state;
                                }
                            }
                        }
                    });
                };
                AppComponent.prototype.select = function (player) {
                    this.selectedPlayer = player;
                    this.selectedState = player.state;
                    if (config_1.APP_CONFIG.USE_WEBSOCKET_EVENTS) {
                        this.getStatePush();
                    }
                    else {
                        this.getStatePoll();
                    }
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
                    this.getStateOnce();
                };
                AppComponent.prototype.volumeUp = function () {
                    this._sonosService.volumeUp(this.selectedPlayer);
                    this.getStateOnce();
                };
                AppComponent.prototype.showFlickr = function () {
                    var _this = this;
                    this.showFlickrPhotoFrame = true;
                    this.latestPhotoPoll = this._flickrService.getRandomPhotoPoll().subscribe(function (photo) { _this.currentFlickrPhoto = photo; });
                };
                AppComponent.prototype.hideFlickr = function () {
                    this.showFlickrPhotoFrame = false;
                    if (this.latestPhotoPoll) {
                        this.latestPhotoPoll.unsubscribe();
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/components/app/app.component.html',
                        providers: [http_1.HTTP_PROVIDERS, sonos_service_1.SonosService, flickr_service_1.FlickrService]
                    }), 
                    __metadata('design:paramtypes', [sonos_service_1.SonosService, flickr_service_1.FlickrService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map