import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import {BrowserModule} from '@angular/platform-browser';

import { HomeComponent} from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { appRoutingModule } from './app.routing';

//create the fake backend 
import { fakeBackendProvider } from './_helpers';

@NgModule({
    imports:[
    BrowserModule,
    appRoutingModule
],
    declarations: [
    AppComponent,
    HomeComponent, 
    LoginComponent,
    RegisterComponent
],
providers:[
    //provider used to create fake baxkend 
    fakeBackendProvider
],

    bootstrap: [AppComponent]
})
export class AppModule{}