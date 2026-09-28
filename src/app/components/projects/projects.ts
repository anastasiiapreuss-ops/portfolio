import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  // github/live: Platzhalter – echte Links werden später eingesetzt
  projects = [
    {
      title: 'Join',
      image: '/assets/imgs/join.png',
      tags: ['Angular', 'TypeScript', 'Firebase'],
      description: 'PROJECTS.JOIN_DESC',
      github: '#',
      live: '#',
    },
    {
      title: 'El Pollo Loco',
      image: '/assets/imgs/el_pollo_loco.png',
      tags: ['JavaScript', 'HTML', 'CSS'],
      description: 'PROJECTS.POLLO_DESC',
      github: '#',
      live: '#',
    },
    {
      title: 'Memory',
      image: '/assets/imgs/memory.png',
      tags: ['JavaScript', 'HTML', 'CSS'],
      description: 'PROJECTS.MEMORY_DESC',
      github: '#',
      live: '#',
    },

  ];

  // Projekte, deren Bild schon einmal gehovert wurde – bleiben danach farbig
  litProjects = new Set<string>();

  light(title: string) {
    this.litProjects.add(title);
  }
}
