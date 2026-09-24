import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  imports: [TranslatePipe],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero {
 
}
