import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
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
  downloadResume() {
    const link = document.createElement('a');
    link.href = 'AkashThina%20Resume.pdf'; 
    link.download = 'Akash_Resume.pdf';  
    link.click();
  }
  gotoExplore() {
    this.route.navigate(["explore"])
  }
  gotoProjects() {
    this.route.navigate(["projects"])
  }
}