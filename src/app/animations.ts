import {
  trigger,
  group,
  transition,
  animate,
  style,
  query
} from '@angular/animations';


export const slideInAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: -24,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    group([
      query(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ], { optional: true }),
    ])
  ])
]);
