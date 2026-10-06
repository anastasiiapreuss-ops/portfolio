import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  projects = [
    {
      title: 'Join',
      image: 'assets/imgs/join.png',
      tags: ['Angular', 'TypeScript', 'Firebase'],
      description: 'PROJECTS.JOIN_DESC',
      github: '#',
      live: '#',
    },
    {
      title: 'El Pollo Loco',
      image: 'assets/imgs/el_pollo_loco.webp',
      tags: ['JavaScript', 'HTML', 'CSS'],
      description: 'PROJECTS.POLLO_DESC',
      github: 'https://github.com/anastasiiapreuss-ops/El-Pollo-Loco',
      live: 'https://anastasiiapreuss.developerakademie.net/El_Pollo_Loco/index.html',
    },
    {
      title: 'Memory',
      image: 'assets/imgs/memory.png',
      tags: ['JavaScript', 'HTML', 'CSS'],
      description: 'PROJECTS.MEMORY_DESC',
      github: 'https://github.com/anastasiiapreuss-ops/Memory',
      live: 'https://anastasiiapreuss.developerakademie.net/Memory/dist/index.html',
    },

  ];

  litProjects = new Set<string>();

  light(title: string) {
    this.litProjects.add(title);
  }
}
