import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IntersectionObserverService } from '../intersection-observer.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit, AfterViewInit {
  pictures = ['me1.jpg'];
  currentText = 0;
  @ViewChildren('aboutHeading') aboutHeading!: QueryList<any>;
  @ViewChildren('aboutSection') aboutSection!: QueryList<any>;
  @ViewChildren('img') img!: QueryList<any>;
  @ViewChildren('textbox') textbox!: QueryList<any>;
  @ViewChildren('lines') lines!: QueryList<any>;
  @ViewChild('textContainer') textContainer!: ElementRef;
  @ViewChildren('separator') separator!: QueryList<any>;
  @HostListener('window:resize', ['$event'])
  resizeEvent(){
    this.setTextContanerHeight();
  }
  textboxArr!: ElementRef[];
  imgArr!: ElementRef[];
  linesArr!: ElementRef[];
  textHover = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.textboxArr = this.textbox.toArray();
    this.imgArr = this.img.toArray();
    this.linesArr = this.lines.toArray();
    this.setTextContanerHeight();
    this.separator.toArray().forEach(s => s.nativeElement.classList.add('tt-0'))
  }

  switchText() {
    this.currentText++;
    this.currentText = this.currentText % 3;
    let before: number;
    let next: number;
    this.currentText === 0 ? (before = 2) : (before = this.currentText - 1);
    this.currentText === 2 ? (next = 0) : (next = this.currentText + 1);
    this.textboxArr[this.currentText].nativeElement.style.left = '0';
    this.imgArr[this.currentText].nativeElement.style.left = '0';
    this.textboxArr[before].nativeElement.style.left = '-100%';
    this.imgArr[before].nativeElement.style.left = '-100%';
    setTimeout(() => {
      this.imgArr[before].nativeElement.style.display = 'none';
      this.textboxArr[before].nativeElement.style.display = 'none';
    }, 225);
    this.textboxArr[next].nativeElement.style.left = 'calc(100% + 60px)';
    this.imgArr[next].nativeElement.style.left = '100%';
    setTimeout(() => {
      this.imgArr[next].nativeElement.style.display = 'unset';
      this.textboxArr[next].nativeElement.style.display = 'unset';
    }, 225);
  }

  onHover() {
    this.textHover = true;
    this.linesArr.forEach((l) => {
      l.nativeElement.classList.add('hover-lines');

      setTimeout(() => {
        l.nativeElement.style.display = 'none';
      }, 350);
    });
  }
  offHover() {
    this.textHover = false;
    this.linesArr.forEach((l) => {
      l.nativeElement.style.display = 'unset';

      setTimeout(() => {
        l.nativeElement.classList.remove('hover-lines');
      }, 1);
    });
  }

  setTextContanerHeight(){
    let maxHeight = Math.max(this.textboxArr[0].nativeElement.clientHeight, this.textboxArr[1].nativeElement.clientHeight, this.textboxArr[2].nativeElement.clientHeight)
    this.textContainer.nativeElement.style.height = `${maxHeight}px`
  }
}
