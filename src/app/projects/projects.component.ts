import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { projects } from '../projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnChanges {
  projects = projects;
  @Input() currentProject: any;
  @Output() goBack = new EventEmitter();
  @ViewChildren('img') img!: QueryList<any>;
  currentImage = 0;
  imgArr!: ElementRef[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.currentProject)
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.currentProject)

  }

  ngAfterViewInit(): void {
    this.imgArr = this.img.toArray();
  }

  slideImagesLeft() {
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

  backToPortfolio(){
    this.goBack.emit(true);
  }
}
