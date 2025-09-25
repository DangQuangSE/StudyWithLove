import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'add-user',
    component: UserAddComponent,
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
