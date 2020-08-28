import { Component, Input, OnDestroy, OnInit, NgZone } from "@angular/core";

@Component({
  selector: 'countdown',
  template: `{{displayString}}`
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() units: string;
  @Input() end: any;
  @Input() displayString: string = '';
  @Input() text: any;

  unitsArray: string[] = [];
  intervalId = 0;

  clearTimer() { clearInterval(this.intervalId); }

  ngOnDestroy() { this.clearTimer(); }
  ngOnInit() { this.start(); }

  constructor(private _ngZone: NgZone) {}

  start() { 
    this.clearTimer();
    // need to run outside of angular for protractor tests as protractor will always think that the app is "unstable"
    this._ngZone.runOutsideAngular(() => {
      this.intervalId = window.setInterval(() => this._ngZone.run(() => this._displayString()), 100);
    });
  }

  private _displayString() {
    if (typeof this.units === 'string') {
      this.unitsArray = this.units.split('|');
    }

    let givenDate: any = new Date(this.end);
    let now: any = new Date();

    let dateDifference: any = givenDate - now;
    let lastUnit = this.unitsArray[this.unitsArray.length - 1],
        unitConstantForMillisecs = {
          weeks: (1000 * 60 * 60 * 24 * 7),
          days: (1000 * 60 * 60 * 24),
          hours: (1000 * 60 * 60),
          minutes: (1000 * 60),
          seconds: 1000,
          milliseconds: 1
        },
        unitsLeft = {},
        returnString = '',
        totalMillisecsLeft = dateDifference,
        i,
        unit: any;
    for (i in this.unitsArray) {
      if (this.unitsArray.hasOwnProperty(i)) {

        unit = this.unitsArray[i].trim();
        if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
          //$interval.cancel(countDownInterval);
          throw new Error('Cannot repeat unit: ' + unit);

        }
        if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
          throw new Error('Unit: ' + unit + ' is not supported. Please use following units: weeks, days, hours, minutes, seconds, milliseconds');
        }

        unitsLeft[unit] = totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];

        if (lastUnit === unit) {
          unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
        } else {
          unitsLeft[unit] = Math.floor(unitsLeft[unit]);
        }
        totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
        unitConstantForMillisecs[unit.toLowerCase()] = false;


        returnString += ' ' + unitsLeft[unit] + ' ' + unit;
      }
    }

    if (this.text === null) {
      this.text = {
        "Weeks": "Weeks",
        "Days": "Days", "Hours": "Hours",
        "Minutes": "Minutes", "Seconds": "Seconds",
        "MilliSeconds": "Milliseconds"
      };
    }

    this.displayString = returnString
      .replace('Weeks', this.text.Weeks)
      .replace('Days', this.text.Days)
      .replace('Hours', this.text.Hours)
      .replace('Minutes', this.text.Minutes)
      .replace('Seconds', this.text.Seconds)
      .replace('Milliseconds', this.text.MilliSeconds);
  }
}
