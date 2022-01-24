import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit {

  pictures = ['me1.jpg', ]
  observer!: IntersectionObserver;
  @ViewChild('aboutHeading') aboutHeading!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      
    const options = {
      root: null,
      rootMargin: "-130px",
      threshold: 0.9
    }
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        e.target.classList.toggle('visible')
        console.log(e)
        if(e.isIntersecting){
          /* this.observer.unobserve(e.target); */
        }
      })
    }, options);
  
    this.observer.observe(this.aboutHeading.nativeElement);
  }

}
