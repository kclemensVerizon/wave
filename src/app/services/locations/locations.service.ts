import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  locations:Array<any>

  constructor() {

   }


   getLocations(locationType:string) {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.locations =
        [
          {'lat':37.7749,'lng':-122.4194,'draggable':true,'label':'San Francisco'},
          {'lat':37.3382,'lng':-121.8863,'draggable':false,'label':'San Jose'},
          {'lat':29.7604,'lng':-95.3698,'draggable':true,'label':'Houston'},
          {'lat':27.9506,'lng':-82.4572,'draggable':false,'label':'Tampa'}
        ];    
        if (!this.locations) {
          reject();
        } else {
           resolve(this.locations);
        }
      }, 10);
    });
    return promise;
  }

}
