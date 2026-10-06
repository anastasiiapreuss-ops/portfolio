import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  imports:[RouterLink, TranslatePipe],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private translate = inject(TranslateService);

  menuOpen = signal(false);

  useLanguage(language: string): void {
      this.translate.use(language);
      document.documentElement.lang = language;
  }

  isActive(language: string): boolean {
      return this.translate.getCurrentLang() === language;
  }

  toggleMenu(): void {
      this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
      this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
      this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
      if (window.innerWidth > 768) {
          this.closeMenu();
      }
  }
}
