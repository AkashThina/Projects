import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Dynamic Components - Forms',
      description: 'A JSON-driven Angular tool that builds reactive forms on the fly with advanced validation rules, conditional fields, and real-time rendering.',
      demo: '#',
      code: '#'
    },
    {
      title: 'Financial Step-Up Calculators',
      description: "Web-based financial tools for long-term investment planning. Includes an NPS calculator for retirement corpus estimation and a step-up investment simulator. Built using Bootstrap and vanilla JavaScript, with clean Ul and export- friendly tables.",
      demo: '#',
      code: '#'
    },
    {
      title: 'User Profile Dashboard',
      description: 'Display and manage user profiles in card views with CRUD operations and status indicators.',
      demo: '#',
      code: '#'
    },
    {
      title: 'Blog Post Gallery',
      description: 'Grid layout of blog cards with titles, excerpts, and a detail view. Supports filtering and pagination.',
      demo: '#',
      code: '#'
    },
    {
      title: 'Recipe App',
      description: 'Cards for recipes with images, cooking time, and ingredient previews. Responsive and filterable.',
      demo: '#',
      code: '#'
    },
    {
      title: 'Team Member Directory',
      description: 'Searchable directory showing employee cards with photos, roles, and contact actions.',
      demo: '#',
      code: '#'
    }
  ];

  constructor(private route: Router) { }


  gotoStepUp(project: any) {


    if (project.title === 'Financial Step-Up Calculators') {
      this.route.navigate(['calculator']);
    }
    // else if(project.title === 'Dynamic Components - Forms'){
    //   this.route.navigate(['dynamicForm']);
    // }
    else{
      console.log("No Routing is matched");
      
    }
  }
}
