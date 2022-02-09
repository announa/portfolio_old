import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IntersectionObserverService } from '../intersection-observer.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {

  @ViewChildren('contactHeading') contactHeading!: QueryList<any>;
  @ViewChildren('contactForm') contactForm!: QueryList<any>;

  constructor(public observer: IntersectionObserverService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const observeItems = [this.contactHeading, this.contactForm];
    this.observer.createIntersectionObserver(observeItems);
  }

}
