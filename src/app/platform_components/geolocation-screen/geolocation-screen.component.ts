import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-geolocation-screen',
  templateUrl: './geolocation-screen.component.html',
  styleUrls: ['./geolocation-screen.component.scss'],
})
export class GeolocationScreenComponent implements OnInit {

  coords;
  places:NativeGeocoderResult[];

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() { }

  getCurrentLocation() {
    console.log("Getting location")
    this.geolocation.getCurrentPosition()
      .then(data => {
        console.log(data.coords.latitude);
        this.coords = data.coords;
        this.getPlaceName(data.coords.latitude, data.coords.longitude)
      }).catch(err => {
        console.log(err);
      })
  }

  getPlaceName(lat, lon) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat,lon, options)
      .then((result: NativeGeocoderResult[]) => {
        this.places = result;
      })
      .catch((error: any) => console.log(error));
  }

}
