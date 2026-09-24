import { Component, inject } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  imports:[TranslatePipe],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private translate = inject(TranslateService);

  useLanguage(language: string): void {
      this.translate.use(language);
  }

  isActive(language: string): boolean {
      return this.translate.getCurrentLang() === language;
  }


}
