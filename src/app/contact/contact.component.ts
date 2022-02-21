import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
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
  invalid = false;

  @ViewChildren('contactHeading') contactHeading!: QueryList<any>;
  @ViewChildren('contactForm') contactForm!: QueryList<any>;

  endpoint = 'http://anna-ludewig.developerakademie.com/annaludewig/sendmail.php';
  body = (payload: any) => JSON.stringify(payload);

  submitted = false;

  constructor(
    public observer: IntersectionObserverService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const observeItems = [this.contactHeading, this.contactForm];
    this.observer.createIntersectionObserver(observeItems);
  }

/*   ngOnChanges(changes: SimpleChanges): void {
      this.invalid = 
  } */

  onSubmit(ngForm: any) {
/*     if (ngForm.form.valid) { */
      console.log('send');
      this.submitted = true;
      this.http
        .post(this.endpoint, this.body(this.contactData))
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.error(error),
          complete: () => console.info('send post complete'),
        });
    /* } */
  }
}
