// animations.ts
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('300ms ease-in-out', style({ opacity: 1 }))
  ])
]);
