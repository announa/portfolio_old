import {
  AfterViewInit,
  ElementRef,
  Injectable,
  QueryList,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService implements AfterViewInit {
  observer!: IntersectionObserver;
  elements!: QueryList<any>;

  constructor() {}

  ngAfterViewInit(): void {}

  createIntersectionObserver(observeItems: any) {
    let options = {
      root: null,
      rootMargin: '-125px 0px',
      threshold: 0.4,
    };

    if (observeItems.id == 'contactform') {
      options.threshold = 0.1;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (
            e.target.classList.contains('project') ||
            e.target.classList.contains('skill-container')
          ) {
            this.setElementFamily(e.target);
          }
          if(e.target.classList.contains('project')){
            setTimeout(() => {
              e.target.classList.add('img-layer--hover')
            }, 1000);
          }

          e.target.classList.add('o-1');
          this.observer.unobserve(e.target);
        }
      });
    }, options);

    observeItems.forEach((item: any) => {
      item.forEach((i: ElementRef) => this.observer.observe(i.nativeElement));
    });
  }

  setElementFamily(target: any) {
    target.previousSibling.classList.add('tt-0');

    let children = Array.from(target.children);
    children.forEach((child: any) => {
      child.classList.add('tt-0');
    });
      setTimeout(() => {
        target.firstChild.lastChild.classList.remove('o-0');
        target.lastChild.lastChild.classList.remove('o-0');
      }, 600);
  }
}
