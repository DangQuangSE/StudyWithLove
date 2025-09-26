import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.users = data;
    });
  }
}
