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
          console.log(e.target)
           if(e.isIntersecting){
            e.target.classList.add('o-1')
            this.observer.unobserve(e.target)
          } /* else{
            e.target.classList.remove('o-1')
          } */
        })
      }, options);
  
      observeItems.forEach((item: any) => {
        console.log(item)
        item.forEach((i: ElementRef) => this.observer.observe(i.nativeElement));
      });
    }
}
