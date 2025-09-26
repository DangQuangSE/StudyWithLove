import { NgModule } from '@angular/core';
import { UserAddComponent } from './user-add.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserAddComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [UserAddComponent],
})
export class UserAddModule {}
