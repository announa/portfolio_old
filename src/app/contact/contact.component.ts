import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IntersectionObserverService } from '../intersection-observer.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, AfterViewInit {
    contact = {
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  }

  submitted = false;

  @ViewChildren('contactHeading') contactHeading!: QueryList<any>;
  @ViewChildren('contactForm') contactForm!: QueryList<any>;

  constructor(public observer: IntersectionObserverService) {}

  ngOnInit(): void {
    console.log(this.contact)
  }

  ngAfterViewInit(): void {
    const observeItems = [this.contactHeading, this.contactForm];
    this.observer.createIntersectionObserver(observeItems);
  }

  submit() {
    console.log(this.contact);
    this.submitted = true;
  }
}
