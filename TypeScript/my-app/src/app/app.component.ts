import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class App {
  // Khai báo 'title' là một signal với giá trị mặc định 'my-app'
  protected readonly title = signal('my-app');
}
