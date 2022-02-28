import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IntersectionObserverService } from '../intersection-observer.service';
import { NavigationService } from '../navigation.service';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  bigger800!: boolean;
  @Output() openProject = new EventEmitter();
  @ViewChildren('project') project!: QueryList<any>;
  @ViewChild('portfolio') portfolio!: ElementRef;
  @ViewChildren('text') text!: QueryList<any>;
  @ViewChildren('portfolioHeading') portfolioHeading!: QueryList<any>;
  @ViewChildren('imgContainer') imgContainer!: QueryList<any>;
  @ViewChildren('description') description!: QueryList<any>;
  @ViewChildren('separator') separator!: QueryList<any>;
  @ViewChildren('projectContainer') projectContainer!: QueryList<any>;
  @HostListener('document:scroll', ['$event'])
  fadeComponent($event: Event) {}
  @HostListener('window:resize', ['$event'])
  resize() {
    this.checkWindowSize();
  }
  /*   let scrollOffset = $event.srcElement.children[0].scrollTop;
  console.log("window scroll: ", scrollOffset); */

  constructor(
    public observer: IntersectionObserverService,
    public navigation: NavigationService,
    public projects: ProjectsService
  ) {
    this.checkWindowSize();
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    const observeItems = [
      this.project,
      this.portfolioHeading,
      this.text,
      this.separator
    ];
    this.observer.createIntersectionObserver(observeItems);
  }

  showProject(projectLink: string) {
    this.openProject.emit(projectLink);
  }

  checkWindowSize() {
    if (window.innerWidth >= 800) {
      this.bigger800 = true;
    } else {
      this.bigger800 = false;
    }
  }
}
