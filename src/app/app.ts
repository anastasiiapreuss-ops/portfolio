import { Component, afterNextRender, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { Footer } from './components/footer/footer';

@Component({
  imports: [RouterOutlet, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('portfolio');

   constructor() {                                                  
    afterNextRender(() => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    });
  }
}

