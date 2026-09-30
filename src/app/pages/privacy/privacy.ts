import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../components/header/header';
import { LEGAL_DATA } from '../../legal-data';

@Component({
  imports: [Header, RouterLink, TranslatePipe],
  selector: 'app-privacy',
  styleUrl: '../legal-page.scss', // gleiche Styles wie die Impressum-Seite
  templateUrl: './privacy.html',
})
export class Privacy {
  // wird an die translate-Pipe übergeben und füllt {{name}}, {{street}} … in den Texten
  legal = LEGAL_DATA;
}
