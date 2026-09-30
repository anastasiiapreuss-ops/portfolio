import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../components/header/header';
import { LEGAL_DATA } from '../../legal-data';

@Component({
  imports: [Header, RouterLink, TranslatePipe],
  selector: 'app-imprint',
  styleUrl: '../legal-page.scss', // gleiche Styles wie die Datenschutz-Seite
  templateUrl: './imprint.html',
})
export class Imprint {
  // wird an die translate-Pipe übergeben und füllt {{name}}, {{street}} … in den Texten
  legal = LEGAL_DATA;
}
