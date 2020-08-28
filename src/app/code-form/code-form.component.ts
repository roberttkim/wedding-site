import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GuestService } from '../shared/guest.service';
import { Guest } from '../shared/guest.model';
import { ErrorMessage } from '../shared/error.model';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'code-form',
    templateUrl: './code-form.component.html',
    styleUrls: ['../shared/styles-forms.css', './code-form.component.css']
})
export class CodeFormComponent implements OnDestroy, OnInit {
    @Output() guestEvent = new EventEmitter<Guest>();
    guestSubscription: Subscription;
    codeForm: FormGroup;
    codeFormError: ErrorMessage = {
        message: ''
    };
    isLoading: boolean = false;
    isValidCode: boolean = false;

    constructor(private guestService: GuestService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        // creates form builder controls for items listed in object
        // create form for user to enter in invite code
      this.codeForm = this.formBuilder.group({
        code: [null, [Validators.required]]
      });
    }

    ngOnDestroy() {
      if(this.guestSubscription) this.guestSubscription.unsubscribe();
    }

    getGuest(codeForm: any): void {
        this.isLoading = true;
        this.isValidCode = false;
        this.codeForm.controls['code'].setErrors(null);

        this.guestSubscription = this.guestService
            .getGuest(codeForm.code)
            .subscribe(
                (guest: Guest) => {
                    // setting timeouts purely for UX purposes
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isValidCode = true;
                        // emit to parent component the updated guest
                        this.guestEvent.emit(guest);
                    }, 1000);
                },
                error => {
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isValidCode = false;
                        this.codeFormError.message = error.message ? error.message : 'Could not get HTTP response.';
                        this.codeForm.controls['code'].setErrors({ invalidCode: true });
                        // emit to parent component the updated guest
                        this.guestEvent.emit(null);
                    }, 1000);
                }
            );
    }
}
