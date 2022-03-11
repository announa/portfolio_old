import { ElementRef, Injectable, QueryList, ViewChildren } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  textboxAboutArr!: ElementRef[];
  imgAboutArr!: ElementRef[];
  imgProjectArr!: ElementRef[];
  imgArr!: ElementRef[];
  currentAboutImage = [0];
  currentProjectImage = [0];
  currentImage!: number[];
  swiping: boolean = false;
  lastTouchX!: number;
  touchTimer!: number;

  constructor() {}

  getHTMLElements(type: string, elements: QueryList<any>) {
    if (type == 'aboutmeImg') {
      this.imgAboutArr = elements.toArray();
    } else if (type == 'aboutmeText') {
      this.textboxAboutArr = elements.toArray();
    } else {
      this.imgProjectArr = elements.toArray();
    }
  }

  clickSlide(component: string) {
    if (navigator.maxTouchPoints === 0) {
      this.slideImagesRight(component);
    }
  }
  
  swipeStart(event: any) {
    if (navigator.maxTouchPoints > 0) {
      this.swiping = true;
      this.touchTimer = Date.now();
      this.lastTouchX = event.touches[0].clientX;
      event.preventDefault();
    }
  }
  
  swipe(event: any, component: string) {
    if (navigator.maxTouchPoints > 0 && this.swiping) {
      event.preventDefault();
      if (this.touchTimer - Date.now() < -5) {
        if (event.touches[0].clientX - this.lastTouchX < -20) {
          this.slideImagesRight(component);
        }
        if (event.touches[0].clientX - this.lastTouchX > 20) {
          this.slideImagesLeft(component);
        }
        this.swiping = false;
      }
      this.swiping = false;
    }
  }

  slideImagesLeft(component: string) {
    this.currentImage =
      component == 'aboutme'
        ? this.currentAboutImage
        : this.currentProjectImage;
    this.imgArr =
      component == 'aboutme' ? this.imgAboutArr : this.imgProjectArr;
    this.currentImage[0]--;
    this.currentImage[0] = this.currentImage[0] < 0 ? 2 : this.currentImage[0];
    this.slideContent('left');
  }

  slideImagesRight(component: string) {
    this.currentImage =
      component == 'aboutme'
        ? this.currentAboutImage
        : this.currentProjectImage;
    this.imgArr =
      component == 'aboutme' ? this.imgAboutArr : this.imgProjectArr;
    this.currentImage[0]++;
    this.currentImage[0] = this.currentImage[0] % 3;
    this.slideContent('right');
  }

  slideContent(direction: string) {
    let before: number;
    let next: number;
    this.currentImage[0] === 0
      ? (before = 2)
      : (before = this.currentImage[0] - 1);
    this.currentImage[0] === 2 ? (next = 0) : (next = this.currentImage[0] + 1);
    this.slide(direction, this.imgArr, before, next);
    if (this.imgArr == this.imgAboutArr) {
      this.slide(direction, this.textboxAboutArr, before, next);
    }
  }

  slide(direction: string, arr: ElementRef[], before: number, next: number) {
    arr[this.currentImage[0]].nativeElement.style.left = '0';
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

  selectImage(component: string, imgNumber: number) {
    this.currentImage =
      component == 'aboutme'
        ? this.currentAboutImage
        : this.currentProjectImage;
    this.imgArr =
      component == 'aboutme' ? this.imgAboutArr : this.imgProjectArr;

    let imgNow = this.currentImage[0];
    this.currentImage[0] = imgNumber;
    if (
      imgNow - this.currentImage[0] == -1 ||
      (imgNow == 2 && this.currentImage[0] == 0)
    ) {
      this.slideContent('right');
    } else {
      this.slideContent('left');
    }
  }
}
