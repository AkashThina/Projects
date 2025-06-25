import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  name = "I'm Akash Thina";
  title = "BSc.Computer Science,";
  role = "I'm a Web Developer.";
  description = "I Design, Develop, Maintain, Build and Deploy Enterprise Level Web Applications";

  displayedName = '';
  displayedTitle = '';
  displayedRole = '';
  displayedDescription = '';

  showCard = false;
  showDescription = false;

  private timeouts: any[] = [];

  ngOnInit(): void {
    this.startAnimations();
  }

  ngOnDestroy(): void {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  startAnimations(): void {
    // Show card first
    this.timeouts.push(setTimeout(() => {
      this.showCard = true;
    }, 300));

    // Animate name
    this.timeouts.push(setTimeout(() => {
      this.typeWriter(this.name, 'name');
    }, 800));

    // Animate title
    this.timeouts.push(setTimeout(() => {
      this.typeWriter(this.title, 'title');
    }, 2000));

    // Animate role
    this.timeouts.push(setTimeout(() => {
      this.typeWriter(this.role, 'role');
    }, 3200));

    // Show description
    this.timeouts.push(setTimeout(() => {
      this.showDescription = true;
      this.typeWriter(this.description, 'description');
    }, 4400));
  }

  typeWriter(text: string, property: string): void {
    let i = 0;
    const speed = 50;

    const typing = () => {
      if (i < text.length) {
        switch (property) {
          case 'name':
            this.displayedName += text.charAt(i);
            break;
          case 'title':
            this.displayedTitle += text.charAt(i);
            break;
          case 'role':
            this.displayedRole += text.charAt(i);
            break;
          case 'description':
            this.displayedDescription += text.charAt(i);
            break;
        }
        i++;
        this.timeouts.push(setTimeout(typing, speed));
      }
    };
    typing();
  }
}