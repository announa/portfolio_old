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

  shuffle = 0;

  @ViewChildren('skillsHeading') skillsHeading!: QueryList<any>;
  @ViewChildren('skillContainer') skillContainer!: QueryList<any>;
  @ViewChildren('skill') domSkills!: QueryList<any>;
  skillArr!: ElementRef[];

  constructor(public observer: IntersectionObserverService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.skillArr = this.domSkills.toArray();
    const observeItems = [this.skillsHeading, this.skillContainer];
    this.observer.createIntersectionObserver(observeItems);
  }

  shuffleSkills(){
    this.skillArr.forEach(s => {
      s.nativeElement.classList.remove('tt-0')
      setTimeout(() => {
      this.shuffle++;
      this.shuffle = this.shuffle % 3
      s.nativeElement.classList.add('tt-0')
    }, 500);})
  }
}
