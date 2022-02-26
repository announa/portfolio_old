import {
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
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'REST API',
    'TypeScript',
    'git',
    'Angular',
    'SCRUM',
    'Material',
    ''
  ];

  @ViewChildren('skillHeading') skillHeading!: QueryList<any>;
  @ViewChildren('skillContainer') skillContainer!: QueryList<any>;

  constructor(public observer: IntersectionObserverService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const observeItems = [this.skillHeading, this.skillContainer];
    this.observer.createIntersectionObserver(observeItems);
  }

 
}
