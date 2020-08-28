import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { GuestService } from '../shared/guest.service';
import { Guest } from '../shared/guest.model';
import { ErrorMessage } from '../shared/error.model';
import { Subscription } from 'rxjs';

// import {minValueValidator} from './min-value.directive';

@Component({
  moduleId: module.id,
  selector: 'rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['../shared/two-column-layout.css', '../shared/styles-forms.css', './rsvp.component.css']
})
export class RsvpComponent implements OnInit, OnDestroy {
  guest: Guest;
  guestForm: FormGroup;
  additionalGuestForms: FormGroup[];
  guestSubscription: Subscription;
  attendingSubscription: Subscription;
  guestCountSubscription: Subscription;
  isCompleted: boolean = false;
  isLoading: boolean = false;
  guestFormError: ErrorMessage = {
    message: ''
  };
  attendingOptions = [
    { value: true, display: "YES" },
    { value: false, display: "NO" }
  ];
  numberOfGuests = [];

  constructor(private guestService: GuestService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // create form for user to enter in guest info
    this.guestForm = this.formBuilder.group({
      attending: [null, Validators.required],
      address: [null],
      email: [null, Validators.required],
      guestCountActual: [null],
      additionalGuests: this.formBuilder.array([])
    });

    // activate watchers for value changes
    this.attendingWatcher();
    this.guestCountActualWatcher();
  }

  ngOnDestroy() {
    if(this.guestSubscription) this.guestSubscription.unsubscribe();
    if(this.guestCountSubscription) this.guestCountSubscription.unsubscribe();
    if(this.attendingSubscription) this.attendingSubscription.unsubscribe();
  }

  updateGuestFormValidators(formSection: string, additionalGuestCount?: number) {
    switch (formSection) {
      case 'additionalGuests': {
        let loopCount = additionalGuestCount ? additionalGuestCount : this.guest.additionalGuests.length;
      }
    }
  }

  // watch for the value that the user inputs for whether they are attending or not
  // if attending, set flag to show more form fields
  attendingWatcher() {
    const attendingControl = this.guestForm.get('attending');

    this.attendingSubscription = attendingControl.valueChanges.subscribe(
      (value: boolean) => {
        if (value === true) {
          // automatically set the value of the guest count to 1 if guestCountMax is 1
          if (this.guest.guestCountMax === 1) {
            this.guestForm.controls['guestCountActual'].setValue(1);
          }

          // set up validation for new form fields
          this.guestForm.controls['guestCountActual'].setValidators(Validators.required);
          this.guestForm.controls['guestCountActual'].updateValueAndValidity();
          this.guestForm.controls['address'].setValidators(Validators.required);
          this.guestForm.controls['address'].updateValueAndValidity();
        } else if (value === false) {
          // reset the guestCountActual to 0 and form validations, need to do this step as user can go back & forth between true/false
          this.guestForm.controls['guestCountActual'].setValue(0);
          this.guestForm.controls['guestCountActual'].setValidators(null);
          this.guestForm.controls['guestCountActual'].updateValueAndValidity();
          this.guestForm.controls['address'].setValidators(null);
          this.guestForm.controls['address'].updateValueAndValidity();
        }
      }
    );
  }

  // watch for the vlaue that the user inputs for the guest count
  // if more than 1 guest, set flag to show more form fields
  guestCountActualWatcher() {
    const guestCountActualControl = this.guestForm.get('guestCountActual');

    this.guestCountSubscription = guestCountActualControl.valueChanges.subscribe(
      (value: number) => {
        const additionalGuestsFormArray = this.guestForm.controls['additionalGuests'] as FormArray;
        this.additionalGuestForms = [];

        // reset the array
        while (additionalGuestsFormArray.length) {
          additionalGuestsFormArray.removeAt(0);
        }

        // add an additional guest form for each extra guest
        for (let _i = 0; _i < value; _i++) {
          let additionalGuestFormGroup: any;

          // set main guest and disable the field from changing
          if (_i === 0) {
            additionalGuestFormGroup = {
              firstName: [{ value: this.guest.firstName, disabled: true }, Validators.required],
              lastName: [{ value: this.guest.lastName, disabled: true }, Validators.required]
            };
          } else {
            if (this.guest.additionalGuests[_i - 1] &&
              this.guest.additionalGuests[_i - 1].firstName &&
              this.guest.additionalGuests[_i - 1].firstName !== '' &&
              this.guest.additionalGuests[_i - 1].lastName &&
              this.guest.additionalGuests[_i - 1].lastName !== ''
            ) {
              // set additional guests if known
              additionalGuestFormGroup = {
                firstName: [this.guest.additionalGuests[_i - 1].firstName, Validators.required],
                lastName: [this.guest.additionalGuests[_i - 1].lastName, Validators.required]
              };
            } else {
              additionalGuestFormGroup = {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required]
              };
            }
          }

          this.additionalGuestForms.push(this.formBuilder.group(additionalGuestFormGroup));
          additionalGuestsFormArray.push(this.additionalGuestForms[_i]);
        }
      }
    );
  }

  getGuest(guest: Guest): void {
    this.numberOfGuests = [];
    this.guestForm.reset();
    this.guest = guest;

    if (this.guest) {
      // create the array of values for the number of guests radio option
      for (let _i = 1; _i <= guest.guestCountMax; _i++) {
        this.numberOfGuests.push(_i);
      }

      // set email if exists
      if (this.guest.email !== null) {
        this.guestForm.controls['email'].setValue(this.guest.email);
      }

      // set address if exists
      if (this.guest.address !== null) {
        this.guestForm.controls['address'].setValue(this.guest.address);
        this.guestForm.controls['address'].setValidators(Validators.required);
        this.guestForm.controls['address'].updateValueAndValidity();
      }

      // fill in more fields for the guest if they've already responded
      if (this.guest.responded === true && this.guest.attending !== null) {
        // set the attending flag, setting this value will trigger attendingWatcher()
        this.guestForm.controls['attending'].setValue(this.guest.attending);

        // set the guest count, setting this value will trigger guestCountActualWatcher()
        if (this.guest.guestCountActual !== null && this.guest.guestCountActual > 0) {
          this.guestForm.controls['guestCountActual'].setValue(this.guest.guestCountActual);
          this.guestForm.controls['guestCountActual'].setValidators(Validators.required);
          this.guestForm.controls['guestCountActual'].updateValueAndValidity();
        }

      }
    }
  }

  updateGuest(guestForm: any): void {
    this.isLoading = true;
    this.guest.responded = true;
    this.guest.attending = guestForm.attending;
    this.guest.email = guestForm.email;
    this.guest.address = guestForm.address;
    this.guest.guestCountActual = guestForm.guestCountActual;
    this.guest.additionalGuests = guestForm.additionalGuests;

    this.guestForm.setErrors(null);

    this.guestSubscription = this.guestService
      .updateGuest(this.guest)
      .subscribe(
        guest => {
          setTimeout(() => {
            this.isLoading = false;
            this.isCompleted = true;
          }, 1000);
        },
        error => {
          setTimeout(() => {
            this.isLoading = false;
            this.guestForm.setErrors({ invalidForm: true });
            this.guestFormError.message = error.message ? error.message : 'Could not get HTTP response.';
          }, 1000);
        }
      )
  }
}
