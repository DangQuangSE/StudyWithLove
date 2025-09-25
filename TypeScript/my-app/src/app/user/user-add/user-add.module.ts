import { NgModule } from '@angular/core';
import { UserAddComponent } from './user-add.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserAddComponent],
  imports: [CommonModule],
  exports: [UserAddComponent],
})
export class UserAddModule {}
