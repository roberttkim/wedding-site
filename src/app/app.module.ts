import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { CodeFormComponent } from './code-form/code-form.component';
import { CountDownComponent } from './shared/countdown.component';
import { InfoComponent } from './info/info.component';
import { GuestService } from './shared/guest.service';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HeaderModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    RsvpComponent,
    CodeFormComponent,
    CountDownComponent
  ],
  providers: [
    GuestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
