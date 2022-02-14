import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';

/* declare const init: any; */
declare const stopAnimationFrame: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  hideElement = true;
  index: number = 0;
/*   heading_1 = ['H', 'i', ',', ' ', 'I', ' ', 'a', 'm', ' '];
  heading_2 = ['A', 'n', 'n', 'a']; */
  heading_1 = ['L', 'o', 'o', 'k', 'i', 'n', 'g', ' ', 'f', 'o', 'r', ' ', 'a', ' '];
  heading_2 = ['F', 'r', 'o', 'n', 't', 'e', 'n', 'd', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '?'];
  hoverAnimation = false;
  animating = false;
  flipText = false;
  flipText2 = false;

  @ViewChildren('letter') letters!: QueryList<any>;
  @ViewChildren('letter2') letters2!: QueryList<any>;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    let lettersArr = this.letters.toArray();
    let lettersArr2 = this.letters2.toArray();
    this.fallingLetterAnimation(lettersArr);
    setTimeout(() => {
      this.fallingLetterAnimation(lettersArr2)
    }, 700);
    setTimeout(() => {
      this.flipText = true;
      lettersArr2[0].nativeElement.classList.add('o-0')
      console.log(lettersArr2)
    }, 3500);
  }

  ngOnInit(): void {
  }

  fallingLetterAnimation(lettersArr: ElementRef[]) {
    lettersArr.reverse().forEach((l, i) => {
      let letter = l.nativeElement;
      letter.innerHTML == ' ' ? letter.classList.remove('invisible') : null;
      setTimeout(() => {
        letter.classList.remove('invisible');
        letter.classList.add('falling-animation');
        /* this.removeFallingAnimation(l) */
      }, 1000 + 50 * i);
    });
  }

  stopAnimation() {
    stopAnimationFrame();
    this.animating = false;
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
