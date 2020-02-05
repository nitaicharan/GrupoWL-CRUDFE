import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormComponent } from "./form/form.component";
import { InputContanerComponent } from "./input-contaner/input-contaner.component";
import { ROUTES } from "./app.routers";


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    InputContanerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
