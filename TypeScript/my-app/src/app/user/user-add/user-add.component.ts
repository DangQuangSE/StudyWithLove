import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service.js';

@Component({
  selector: 'app-user-add',
  standalone: false,
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent {
  name: string = '';
  email: string = '';
  constructor(private userService: UserService) {}
  addUser(): void {
    const newUser = { name: this.name, email: this.email };
    this.userService.addUser(newUser).subscribe((data) => {
      alert('User added successfully');
    });
  }
}
