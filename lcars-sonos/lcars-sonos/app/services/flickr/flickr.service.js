System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../../config'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, config_1;
    var FlickrService;
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
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            FlickrService = (function () {
                function FlickrService(_http) {
                    var _this = this;
                    this._http = _http;
                    this.getPhotos().subscribe(function (data) {
                        _this.totalPageCount = data.photos.pages;
                        _this.photos = data.photos.photo;
                        for (var i = 2; i <= _this.totalPageCount; i++) {
                            _this.getPhotos(i).subscribe(function (data) {
                                _this.photos = _this.photos.concat(data.photos.photo);
                            });
                        }
                    });
                }
                FlickrService.prototype.getPhotosBaseUrl = function (page) {
                    if (page === void 0) { page = 1; }
                    return config_1.APP_CONFIG.FLICKR_SECRET +
                        "api_key" + config_1.APP_CONFIG.FLICKR_API_KEY +
                        "auth_token" + config_1.APP_CONFIG.FLICKR_AUTH_TOKEN +
                        "formatjsonmethodflickr.people.getPhotosnojsoncallback1page" + page + "per_page500user_idme";
                };
                FlickrService.prototype.getSignature = function (baseUrl) {
                    return md5(baseUrl);
                };
                FlickrService.prototype.getPhotos = function (page) {
                    if (page === void 0) { page = 1; }
                    var search = new http_1.URLSearchParams();
                    search.set("method", "flickr.people.getPhotos");
                    search.set("api_key", config_1.APP_CONFIG.FLICKR_API_KEY);
                    search.set("user_id", "me");
                    search.set("format", "json");
                    search.set("nojsoncallback", "1");
                    search.set("per_page", "500");
                    search.set("page", page.toString());
                    search.set("auth_token", config_1.APP_CONFIG.FLICKR_AUTH_TOKEN);
                    search.set("api_sig", this.getSignature(this.getPhotosBaseUrl(page)));
                    return this._http.get('https://api.flickr.com/services/rest', {
                        search: search
                    })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                FlickrService.prototype.getRandomPhotoPoll = function () {
                    var _this = this;
                    return Observable_1.Observable.interval(5000)
                        .map(function () {
                        var photo = _this.photos[Math.floor(Math.random() * _this.photos.length)];
                        // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
                        return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg";
                    });
                };
                FlickrService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                FlickrService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], FlickrService);
                return FlickrService;
            }());
            exports_1("FlickrService", FlickrService);
        }
    }
});
//# sourceMappingURL=flickr.service.js.map