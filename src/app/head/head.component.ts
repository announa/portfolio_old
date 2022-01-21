import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit, AfterViewInit {
  hideElement = true;
  index: number = 0;
  heading_1 = ['H', 'i', ',', ' ', 'I', ' ', 'a', 'm', ' '];
  heading_2 = ['A', 'n', 'n', 'a'];
  hoverAnimation = false;

  @ViewChildren('letter') letters!: QueryList<any>;

  constructor() {}

  ngAfterViewInit() {
    let lettersArr = this.letters.toArray();
    this.fallingLetterAnimation(lettersArr)
  }
  
  ngOnInit(): void {
  }

  fallingLetterAnimation(lettersArr: ElementRef[]) {
    lettersArr.reverse().forEach((l, i) => {
      let letter = l.nativeElement
      letter.innerHTML == ' '? letter.classList.remove('invisible') : null;
      setTimeout(() => {
        letter.classList.remove('invisible');
         letter.classList.add('falling-animation');
        /* this.removeFallingAnimation(l) */
      }, 1000 + 100 * i);
    });
  }

/*   removeFallingAnimation(letter: ElementRef){
    setTimeout(() => {
      letter.nativeElement.classList.remove('falling-animation')
    }, 700);
  }

  resetAnimation() {
    setTimeout(() => {
      this.hoverAnimation = false;
    }, 850);
  } */
}
