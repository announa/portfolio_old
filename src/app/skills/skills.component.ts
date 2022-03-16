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
    '',
  ];
  skillPosition1: any[] = [];

  shuffle = 0;

  @ViewChildren('skillsHeading') skillsHeading!: QueryList<any>;
  @ViewChildren('skillContainer') skillContainer!: QueryList<any>;
  @ViewChild('skillContainer') skillContainerEl!: ElementRef<any>;
  @ViewChildren('skill') domSkills!: QueryList<any>;
  skillArr!: ElementRef[];

  constructor(public observer: IntersectionObserverService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.skillArr = this.domSkills.toArray();
    const observeItems = [this.skillsHeading];
    this.observer.createIntersectionObserver(observeItems);
  }

  shuffleSkills() {
    setTimeout(() => {
      this.shuffle++;
      this.shuffle = this.shuffle % 3;
    }, 700);
    for (let i = 0; i < this.skillArr.length; i++) {
      this.skillArr[i].nativeElement.classList.remove('tt-0');
      setTimeout(() => {
        this.skillArr[i].nativeElement.classList.add('tt-0');
      }, 700);
    }
  }

  setShuffleClass(i: number) {
    if (this.shuffle == 0) {
      return 'skill' + i + '-0';
    } else if (this.shuffle == 1) {
      return 'skill' + i + '-1';
    } else if (this.shuffle == 2){
      return 'skill' + i + '-2';
    } else {
      return '';
    }
  }
}
