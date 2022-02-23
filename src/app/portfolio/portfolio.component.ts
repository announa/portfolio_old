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

  @Output() openProject = new EventEmitter();
  @ViewChildren('projectItem') projectItemList!: QueryList<any>;
  @ViewChild('portfolio') portfolio!: ElementRef;
  @ViewChildren('text') text!: QueryList<any>;
  @ViewChildren('portfolioHeading') portfolioHeading!: QueryList<any>;
  @ViewChildren('imgContainer') imgContainer!: QueryList<any>;
  @ViewChildren('description') description!: QueryList<any>;
  @HostListener('document:scroll', ['$event'])
  fadeComponent($event: Event) {}
  /*   let scrollOffset = $event.srcElement.children[0].scrollTop;
  console.log("window scroll: ", scrollOffset); */

  constructor(public observer: IntersectionObserverService, public navigation: NavigationService, public projects: ProjectsService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.imgContainer)
    console.log(this.text)
    const observeItems = [this.portfolioHeading, this.text, this.imgContainer, this.description];
    this.observer.createIntersectionObserver(observeItems);
  }

  showProject(projectLink: string){
    this.openProject.emit(projectLink)
  }
}
