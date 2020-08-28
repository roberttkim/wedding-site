import {Component} from '@angular/core';

declare var moment: any;

@Component({
  moduleId:    module.id,
  selector:    'home',
  templateUrl: './home.component.html',
  styleUrls:   ['./home.component.css']
})
export class HomeComponent {
  constructor() {}
  // fields to pass to countdown child component
  units = 'Days | Hours | Minutes | Seconds';
  textFormat = {
    'Weeks':        'WEEKS, ',
    'Days':         'DAYS, ',
    'Hours':        'HOURS, ',
    'Minutes':      'MINUTES AND ',
    'Seconds':      'SECONDS',
    'MilliSeconds': 'MILLISECONDS'
  };
  endDate = moment.tz('2020-12-04 17:00', 'Pacific/Honolulu').valueOf();
}
