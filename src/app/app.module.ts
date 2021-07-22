import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MortgageFormComponent } from './component/mortgage-form/mortgage-form.component';
import { MortgageDetailsComponent } from './component/mortgage-details/mortgage-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MortgageFormComponent,
    MortgageDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
