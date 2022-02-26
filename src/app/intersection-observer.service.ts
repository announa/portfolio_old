import { AfterViewInit, ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService implements AfterViewInit {

  observer!: IntersectionObserver;

  constructor() { }

  ngAfterViewInit(): void {
      
  }

  createIntersectionObserver(observeItems: any){

    const options = {
      root: null,
      rootMargin: "-125px 0px",
      threshold: .4
    }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
           if(e.isIntersecting){
             if(e.target.classList.contains('project') || e.target.classList.contains('skill-container')) {
               let children = Array.from(e.target.children);
               children.forEach(child => child.classList.add('tt-0'))
              }
            e.target.classList.add('o-1')
            this.observer.unobserve(e.target)
          }
        })
      }, options);
  
      observeItems.forEach((item: any) => {
        item.forEach((i: ElementRef) => this.observer.observe(i.nativeElement));
      });
    }
}
