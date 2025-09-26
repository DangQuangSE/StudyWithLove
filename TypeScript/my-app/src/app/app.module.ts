import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [App],
  imports: [BrowserModule, RouterModule, UserModule],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
