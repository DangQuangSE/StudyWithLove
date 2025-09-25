import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Sử dụng standalone component (Angular 14+), không cần AppModule
  imports: [RouterOutlet], // Đảm bảo RouterOutlet được import để sử dụng trong template
  template: `
    <div>
      <h1>{{ title() }}</h1>
      <!-- Sử dụng signal trong template -->
      <nav>
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
      </nav>
      <hr />
      <!-- RouterOutlet sẽ hiển thị component của route tương ứng -->
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {
  // Khai báo 'title' là một signal với giá trị mặc định 'my-app'
  protected readonly title = signal('my-app');
}
