import { Component, OnDestroy, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-scroll-top',
  styleUrl: './scroll-top.scss',
  templateUrl: './scroll-top.html',
  host: {
    '(window:scroll)': 'checkPosition()',
    '(window:resize)': 'checkPosition()',
  },
})
export class ScrollTop implements OnDestroy {
  visible = signal(false);

  checkPosition() {
    this.checkVisibility();
    this.checkFooterOffset();
  }

  checkVisibility() {
    const about = document.getElementById('about-me');
    if (!about) return;
    const aboutTop = about.getBoundingClientRect().top;
    this.visible.set(aboutTop < window.innerHeight / 2);
  }

  checkFooterOffset() {
    const footer = document.querySelector('app-footer');
    if (!footer) return;
    const footerTop = footer.getBoundingClientRect().top;
    const offset = Math.max(0, window.innerHeight - footerTop);
    document.documentElement.style.setProperty('--footer-offset', `${offset}px`);
  }

  scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  ngOnDestroy() {
    document.documentElement.style.removeProperty('--footer-offset');
  }
}
