import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth/auth.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import {
  provideFirebaseApp,
  initializeApp,
  FirebaseAppModule,
} from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
console.log(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent, AuthComponent, TooltipComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FirebaseAppModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
