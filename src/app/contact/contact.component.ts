import { HttpClient } from '@angular/common/http';
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
  contactData = {
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  };
  
    @ViewChildren('contactHeading') contactHeading!: QueryList<any>;
    @ViewChildren('contactForm') contactForm!: QueryList<any>;

  endpoint = 'aludewig@posteo.de';
  body = (payload: any) => JSON.stringify(payload);
  httpHeaders = new Headers()
  .append(
    'Content-Type', 'text/plain'
  )

  submitted = false;

  constructor(
    public observer: IntersectionObserverService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.contactData);
  }

  ngAfterViewInit(): void {
    const observeItems = [this.contactHeading, this.contactForm];
    this.observer.createIntersectionObserver(observeItems);
  }

  submit(ngForm: any) {
    console.log(this.contactData);
    this.submitted = true;
    this.http.post(
      this.endpoint,
      this.body(this.contactData),
      {this.httpHeaders: Headers}).subscribe((response) =>  console.log(response)))
    );
  }
}
