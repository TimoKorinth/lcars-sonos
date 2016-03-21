import { Injectable } from 'angular2/core';

@Injectable()
export class SonosService {

    getZones() {
        return Promise.resolve('Test123');
    }

}