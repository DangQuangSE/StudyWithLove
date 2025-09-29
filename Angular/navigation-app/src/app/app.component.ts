import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isExpanded = true;
  isTablet = false;
  isMobile = false;
  isMobileOpen = false;
  isExpandIcon = true;
  ngOninit() {
    this.checkScreenSize();
  }
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= 1366) {
      this.isExpanded = true;
      this.isTablet = false;
      this.isMobile = false;
    } else if (width >= 1024) {
      this.isExpanded = false;
      this.isTablet = true;
      this.isMobile = false;
    } else {
      this.isExpanded = false;
      this.isTablet = false;
      this.isMobile = false;
    }
  }
  toggleSidebar() {
    if (!this.isExpanded !== this.isExpandIcon) {
      this.toggleIcons();
    }
    if (this.isMobile) {
      this.toggleMobile();
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }
  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
  }
  toggleIcons() {
    this.isExpandIcon = !this.isExpandIcon;
  }
}
