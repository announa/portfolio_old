import { AfterViewInit, ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService implements AfterViewInit {
  observer!: IntersectionObserver;

  constructor() {}

  ngAfterViewInit(): void {}

  createIntersectionObserver(observeItems: any) {
    let options = {
      root: null,
      rootMargin: '-125px 0px',
      threshold: 0.4,
    };

    if(observeItems.id == 'contactform'){
      options.threshold = 0.1
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          console.log(e.target);
          if (e.target.classList.contains('separator')) {
            e.target.classList.add('tt-0');
          }
          if (
            e.target.classList.contains('project') ||
            e.target.classList.contains('skill-container')
          ) {
            this.setChildren(e.target)
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

  setChildren(target: any){
    console.log(target)
    let children = Array.from(target.children);
    console.log(children)
    children.forEach((child: any) => {
      if (!child.classList.contains('portfolio-layer'))
      child.classList.add('tt-0');
      setTimeout(() => {
        child.classList.remove('d-none')
      }, 700);
    });
  }
}
