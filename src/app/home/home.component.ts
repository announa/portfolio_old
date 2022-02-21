import { HttpHeaders } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { StartAnimationComponent } from '../start-animation/start-animation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  hideElement = true;
  index: number = 0;
  heading_1 = ['L', 'o', 'o', 'k', 'i', 'n', 'g', ' ', 'f', 'o', 'r', ' ', 'a', ' '];
  heading_2 = ['F', 'r', 'o', 'n', 't', 'e', 'n', 'd', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '?'];
  hoverAnimation = false;
  animating = false;
  flipText = false;
  flipText2 = false;

  @ViewChildren('letter') letters!: QueryList<any>;
  @ViewChildren('letter2') letters2!: QueryList<any>;
  @ViewChild(StartAnimationComponent) animation!: StartAnimationComponent;

  constructor(private router: Router, private navigation: NavigationService) {}

  ngAfterViewInit() {
    let lettersArr = this.letters.toArray();
    let lettersArr2 = this.letters2.toArray();
    this.fallingLetterAnimation(lettersArr);
    setTimeout(() => {
      this.fallingLetterAnimation(lettersArr2)
    }, 700);
    setTimeout(() => {
      this.flipText = true;
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
      }, 1000 + 50 * i);
    });
  }

  stopAnimation() {
    this.animation.stopAnimationFrame();
    this.animating = false;
    this.router.navigate(['/about']);
  }
}
