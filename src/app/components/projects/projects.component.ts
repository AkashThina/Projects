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
      title: 'Chat Box Ai',
      description: 'Highcharts-powered dashboard that renders various chart types (bar, line, column) dynamically from JSON configurations. Designed for enterprise-level data visualizations with dark/light theme support, responsive design, and reusable chart structures',
      demo: '#',
      code: '#'
    },
    {
      title: 'QR Generator',
      description: 'Grid layout of blog cards with titles, excerpts, and a detail view. Supports filtering and pagination.',
      demo: '#',
      code: '#'
    },
    {
      title: 'Typing Test',
      description: 'Web-based application to evaluate and track typing performance. Includes real-time speed and accuracy analysis, a dynamic word display system, and responsive result cards with performance breakdown. Built using Bootstrap and vanilla JavaScript, with clean UI and exportable result tables.',
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
    else if(project.title === 'Dynamic Components - Forms'){
      this.route.navigate(['dynamicForm']);
    }
    else if(project.title === 'Chat Box Ai'){
       this.route.navigate(['chatboxai']);
    }
    else if(project.title === 'Typing Test'){
       this.route.navigate(['typingtest']);
    }
    else if(project.title === 'QR Generator'){
       this.route.navigate(['qrgenerate']);
    }
    else{
      console.log("No Routing is matched");
    }
  }
}
