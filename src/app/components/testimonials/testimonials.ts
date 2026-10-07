import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-testimonials',
  styleUrl: './testimonials.scss',
  templateUrl: './testimonials.html',
})
export class Testimonials {
  testimonials = [
    {
      text: 'TESTIMONIALS.CHRISTIAN_TEXT',
      name: 'TESTIMONIALS.CHRISTIAN_NAME',
      role: 'TESTIMONIALS.CHRISTIAN_ROLE',
    },
    {
      text: 'TESTIMONIALS.PLACEHOLDER_2_TEXT',
      name: 'TESTIMONIALS.PLACEHOLDER_2_NAME',
      role: 'TESTIMONIALS.PLACEHOLDER_2_ROLE',
    },
    {
      text: 'TESTIMONIALS.PLACEHOLDER_3_TEXT',
      name: 'TESTIMONIALS.PLACEHOLDER_3_NAME',
      role: 'TESTIMONIALS.PLACEHOLDER_3_ROLE',
    },
  ];

  active = signal(0);

  private touchStartX = 0;

  next() {
    this.active.update(i => (i + 1) % this.testimonials.length);
  }

  prev() {
    this.active.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  goTo(index: number) {
    this.active.set(index);
  }

  offset(index: number): number {
    const count = this.testimonials.length;
    let diff = (index - this.active() + count) % count;
    if (diff > count / 2) diff -= count;
    return diff;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const distance = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(distance) < 50) return;
    if (distance < 0) this.next();
    else this.prev();
  }
}
