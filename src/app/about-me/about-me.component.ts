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
  currentImage = 0;
  @ViewChildren('aboutHeading') aboutHeading!: QueryList<any>;
  @ViewChildren('aboutSection') aboutSection!: QueryList<any>;
  @ViewChildren('img') img!: QueryList<any>;
  @ViewChildren('textbox') textbox!: QueryList<any>;
  @ViewChildren('lines') lines!: QueryList<any>;
  @ViewChild('textContainer') textContainer!: ElementRef;
  @ViewChildren('separator') separator!: QueryList<any>;
  @HostListener('window:resize', ['$event'])
  resizeEvent() {
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
    this.separator
      .toArray()
      .forEach((s) => s.nativeElement.classList.add('tt-0'));
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

  setTextContanerHeight() {
    let maxHeight = Math.max(
      this.textboxArr[0].nativeElement.clientHeight,
      this.textboxArr[1].nativeElement.clientHeight,
      this.textboxArr[2].nativeElement.clientHeight
    );
    this.textContainer.nativeElement.style.height = `${maxHeight}px`;
  }

  slideLeft() {
    this.currentImage--;
    this.currentImage = this.currentImage < 0 ? 2 : this.currentImage;
    this.slideContent('left');
  }

  slideRight() {
    this.currentImage++;
    this.currentImage = this.currentImage % 3;
    this.slideContent('right');
  }

  slideContent(direction: string) {
    let before: number;
    let next: number;
    this.currentImage === 0 ? (before = 2) : (before = this.currentImage - 1);
    this.currentImage === 2 ? (next = 0) : (next = this.currentImage + 1);

    [this.textboxArr, this.imgArr].forEach((arr) =>
      this.slide(direction, arr, before, next)
    );
  }


  // this has to be refactored!!!
  slide(direction: string, arr: ElementRef[], before: number, next: number) {
    arr[this.currentImage].nativeElement.style.left = '0';
    if (direction === 'right') {
      arr[next].nativeElement.style.display = 'none';
      arr[before].nativeElement.style.left = '-100%';
      setTimeout(() => {
        arr[next].nativeElement.style.left = '100%';
      }, 1);
      setTimeout(() => {
        arr[next].nativeElement.style.display = 'unset';
      }, 226);
    } else {
      arr[before].nativeElement.style.display = 'none';
      arr[next].nativeElement.style.left = '100%';
      setTimeout(() => {
        arr[before].nativeElement.style.left = '-100%';
      }, 1);
      setTimeout(() => {
        arr[before].nativeElement.style.display = 'unset';
      }, 226);
    }
  }

  selectImage(imgNumber: number) {
    console.log(imgNumber)
    let currentImg = this.currentImage;
    this.currentImage = imgNumber;
    if (
      currentImg - this.currentImage == -1 ||
      (currentImg == 2 && this.currentImage == 0)
    ) {
      this.slideContent('right');
    } else {
      this.slideContent('left');
    }
  }
}
