import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-skills',
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class Skills {
  skills = [
    { name: 'Angular', icon: 'icon-angular' },
    { name: 'TypeScript', icon: 'icon-typescript' },
    { name: 'JavaScript', icon: 'icon-javascript' },
    { name: 'HTML', icon: 'icon-html' },
    { name: 'CSS', icon: 'icon-css' },
    { name: 'Git', icon: 'icon-git' },
    { name: 'REST-API', icon: 'icon-api' },
    { name: 'Scrum', icon: 'icon-scrum' },
  ];
}
