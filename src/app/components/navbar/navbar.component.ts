import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SafePipe } from '../../../assets/safe';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private route: Router) { }
  onMenuToggle() {
    // Handle mobile menu toggle
    console.log('Menu toggled');
  }

  onSettingsClick() {
    // Handle settings click
    console.log('Settings clicked');
  }
  gotoHome() {
    this.route.navigate(["home"])
  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  // resumeUrl = 'assets/AkashThina_Resume.pdf';
  // showPreview = false;

 downloadResume() {
  const fileUrl = 'AkashThina_Resume.pdf';
  window.open(fileUrl, '_blank'); // Opens in a new tab
}

  gotoExplore() {
    this.route.navigate(["explore"])
  }
  gotoProjects() {
    this.route.navigate(["projects"])
  }
}