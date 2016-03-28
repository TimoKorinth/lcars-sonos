import { Injectable, OnInit } from 'angular2/core';
import { Http, Response, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../config';

@Injectable()
export class FlickrService {
    
    photos: any[];
    totalPageCount: number;

    constructor(private _http: Http) {
        this.getPhotos().subscribe(
            data => {
                this.totalPageCount = data.photos.pages;
                this.photos = data.photos.photo;

                for (let i = 2; i <= this.totalPageCount; i++) {
                    this.getPhotos(i).subscribe(
                        data => {
                            this.photos = this.photos.concat(data.photos.photo);
                        }
                    );
                }
            }
        );
    }

    private getPhotosBaseUrl(page: number = 1) {
        return APP_CONFIG.FLICKR_SECRET +
            "api_key" + APP_CONFIG.FLICKR_API_KEY +
            "auth_token" + APP_CONFIG.FLICKR_AUTH_TOKEN +
            "formatjsonmethodflickr.people.getPhotosnojsoncallback1page" + page + "per_page500user_idme";
    }

    private getSignature(baseUrl: string) {
        return md5(baseUrl);
    }

    getPhotos(page: number = 1) {
        var search = new URLSearchParams();
        search.set("method", "flickr.people.getPhotos");
        search.set("api_key", APP_CONFIG.FLICKR_API_KEY);
        search.set("user_id", "me");
        search.set("format", "json");
        search.set("nojsoncallback", "1");
        search.set("per_page", "500");
        search.set("page", page.toString());
        search.set("auth_token", APP_CONFIG.FLICKR_AUTH_TOKEN);
        search.set("api_sig", this.getSignature(this.getPhotosBaseUrl(page)));
        return this._http.get('https://api.flickr.com/services/rest', {
            search
        })
        .map(res => res.json())
        .catch(this.handleError);
    }

    getRandomPhotoPoll() {
        return Observable.interval(30000)
            .map(() => {
                var photo = this.photos[Math.floor(Math.random() * this.photos.length)];
                return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            });
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}