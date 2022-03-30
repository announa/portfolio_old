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
import { ProjectsService } from '../projects.service';
import { SliderService } from '../slider.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit, AfterViewInit {
  pictures = ['me1.jpg'];
  currentAboutImage = 0;
  @ViewChild('aboutme') aboutme!: ElementRef
  @ViewChildren('aboutHeading') aboutHeading!: QueryList<any>;
  @ViewChildren('aboutSection') aboutSection!: QueryList<any>;
  @ViewChildren('imgAbout') imgAbout!: QueryList<any>;
  @ViewChildren('textboxAbout') textboxAbout!: QueryList<any>;
  @ViewChildren('lines') lines!: QueryList<any>;
  @ViewChild('textContainer') textContainer!: ElementRef;
  @ViewChildren('separator') separator!: QueryList<any>;
  @HostListener('window:resize', ['$event'])
  resizeEvent() {
    this.setTextContanerHeight();
  }
  textboxAboutArr!: ElementRef[];
  linesArr!: ElementRef[];
  textHover = false;

  constructor(public slider: SliderService, private projectService: ProjectsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.projectService.aboutme = this.aboutme;
    this.slider.getHTMLElements('aboutmeImg', this.imgAbout);
    this.slider.getHTMLElements('aboutmeText', this.textboxAbout);
    this.textboxAboutArr = this.textboxAbout.toArray();
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
      this.textboxAboutArr[0].nativeElement.clientHeight,
      this.textboxAboutArr[1].nativeElement.clientHeight,
      this.textboxAboutArr[2].nativeElement.clientHeight
    );
    this.textContainer.nativeElement.style.height = `${maxHeight}px`;
  }
}
