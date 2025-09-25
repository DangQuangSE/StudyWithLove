import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app.component';
import { UserListModule } from './user/user-list/user-list.module';
@NgModule({
  declarations: [App],
  imports: [BrowserModule, UserListModule], // Thêm UserListModule vào imports
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
