import { ElementRef, Injectable } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';

@Injectable({
  providedIn: 'root'
})
export class SliderService {


   constructor(){}

/*   slideImagesLeft() {
    this.currentImage--;
    this.currentImage = this.currentImage < 0 ? 2 : this.currentImage;
    this.slideImages('left');
  }

  slideImagesRight() {
    this.currentImage++;
    this.currentImage = this.currentImage % 3;
    this.slideImages('right');
  }

  slideImages(direction: string) {
    let before: number;
    let next: number;
    this.currentImage === 0 ? (before = 2) : (before = this.currentImage - 1);
    this.currentImage === 2 ? (next = 0) : (next = this.currentImage + 1);
    this.imgArr[this.currentImage].nativeElement.style.left = '0';
    if (direction === 'right') {
      this.imgArr[next].nativeElement.style.display = 'none';
      this.imgArr[before].nativeElement.style.left = '-100%';
      setTimeout(() => {
        this.imgArr[next].nativeElement.style.left = '100%';
      }, 1);
      setTimeout(() => {
        this.imgArr[next].nativeElement.style.display = 'unset';
      }, 226);
    } else {
      this.imgArr[before].nativeElement.style.display = 'none';
      this.imgArr[next].nativeElement.style.left = '100%';
      setTimeout(() => {
        this.imgArr[before].nativeElement.style.left = '-100%';
      }, 1);
      setTimeout(() => {
        this.imgArr[before].nativeElement.style.display = 'unset';
      }, 226);
    }
  }

  selectImage(imgNumber: number){
    let imgNow = this.currentImage
    this.currentImage = imgNumber
    if(imgNow - this.currentImage == -1 || imgNow == 2 && this.currentImage == 0){
      this.slideImages('right')
    }else{
      this.slideImages('left')
    }
  } */
}
