import {AfterViewInit, Component} from '@angular/core';

declare var google: any;

@Component({
  selector:    'info',
  templateUrl: './info.component.html',
  styleUrls:   ['../shared/two-column-layout.css', './info.component.css']
})
export class InfoComponent implements AfterViewInit {
  constructor() {}
  ngAfterViewInit() {
    // let map = new google.maps.Map(document.getElementById("map"), {
    //   center:    new google.maps.LatLng(21.278019, -157.831816),
    //   zoom:      18,
    //   mapTypeId: google.maps.MapTypeId.HYBRID
    // });
    //
    // let marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(21.278019, -157.831816),
    //   map: map,
    //   title: 'Halekulani Hotel'
    // });
  }
}
