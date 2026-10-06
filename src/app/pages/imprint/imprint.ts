import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../components/header/header';
import { LEGAL_DATA } from '../../legal-data';

@Component({
  imports: [Header, RouterLink, TranslatePipe],
  selector: 'app-imprint',
  styleUrl: '../legal-page.scss',
  templateUrl: './imprint.html',
})
export class Imprint {
  legal = LEGAL_DATA;
}
