import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  protected readonly language = signal<'de' | 'en'>('en');

  protected setLanguage(lang: 'de' | 'en'): void {
    this.language.set(lang);
  }
}
