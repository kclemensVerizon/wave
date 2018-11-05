///<reference types="@types/googlemaps" />
import { Component } from '@angular/core';
import { LocationsService } from '../../services/locations/locations.service';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {AfterViewInit } from '@angular/core';

  @Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
  })

export class MapComponent implements AfterViewInit { 
  @ViewChild('gmap') gmapElement: any;
  locations:Array<any>;
  locationsService:LocationsService;
  map: google.maps.Map;
  markers:Array<any>;
  directionsService:google.maps.DirectionsService;
  infoWindow:google.maps.InfoWindow;
  directionsDisplay:google.maps.DirectionsRenderer; 
  mapOptions:any;
  canZoom:boolean;
  currentZoom:number;
  startPos:any;
  MY_MAPTYPE_ID:string;
  mainPath:any;
  altPath:any;

  constructor(locationsService:LocationsService)
  {
    this.locationsService = locationsService;
    this.markers = [];
    this.canZoom = true;
    this.currentZoom = 14;

    this.MY_MAPTYPE_ID = 'custom_style';
    this.directionsService = new google.maps.DirectionsService();
    this.infoWindow = new google.maps.InfoWindow;
    this.directionsDisplay = new google.maps.DirectionsRenderer(
    {
      polylineOptions:
      {
        strokeColor : "#FFFFFF"
      }
    });
    this.mapOptions = {
    
      zoomControl: this.canZoom,
      panControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      zoom: this.currentZoom,
      zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT
      },
      center: this.startPos,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, this.MY_MAPTYPE_ID]
      },
      mapTypeId: this.MY_MAPTYPE_ID
    }
  }

  ngAfterViewInit() {
    this.initMap(); 
  }

 
  initMap = () => { 
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.getLocations('init');
  }
    

  getLocations = (loc) =>
  {
    this.locationsService.getLocations(loc)
    .then((newLocs) => this.locationsLoaded(newLocs),(err) =>this.locationsFailure(err));
  }
  
  locationsLoaded = (result:any) =>{
    this.locations = result;
    let $ctrl = this;
    let i:number = 0;
    let bounds = [];
    for(i;i<$ctrl.locations.length;i++){
    var marker = new google.maps.Marker({
      position: {'lat':$ctrl.locations[i].lat,'lng':$ctrl.locations[i].lng},
      map: $ctrl.map,
      title: $ctrl.locations[i].label
    });
    this.markers.push(marker)
    
    }
    this.setBounds(bounds);
  }

  
  
  locationsFailure = (error:any) =>{
    console.log("error: " + error);
  }  

  setBounds = (newBounds) =>
  {
    if(this.markers.length>0){
      let bounds = new google.maps.LatLngBounds();
      let i=0;
      for(i;i<this.markers.length;i++) {
      bounds.extend(this.markers[i].getPosition());
      }
      this.map.fitBounds(bounds);
      }
  }
 
}