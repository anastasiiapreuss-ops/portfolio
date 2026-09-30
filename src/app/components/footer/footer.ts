import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  // aktuelles Jahr für das Copyright – so muss man es nie von Hand ändern
  year = new Date().getFullYear();
}
