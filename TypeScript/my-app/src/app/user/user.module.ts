import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListModule } from './user-list/user-list.module';
import { UserAddModule } from './user-add/user-add.module';
@NgModule({
  declarations: [],
  imports: [UserListModule, UserAddModule],
  exports: [],
})
export class UserModule {}
