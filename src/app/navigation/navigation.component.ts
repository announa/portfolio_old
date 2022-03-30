import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  hideElement = true;
  navOpen = false;
  bigger700;
  hoverTimer!: number;
  lastHoverTarget!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  @HostListener('window:resize', ['$event'])
  resize() {
    this.resetNav();
  }

  constructor(
    public navigation: NavigationService,
    public projects: ProjectsService,
    public router: Router
  ) {
    this.bigger700 = window.innerWidth >= 700 ? true : false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.hideElement = false;
    }, 1);
  }

  toggleMenu() {
    this.navOpen = !this.navOpen;
  }

  resetNav() {
    if (window.innerWidth >= 700) {
      this.navOpen = false;
      this.nav.nativeElement.style = '';
      this.bigger700 = true;
    } else {
      this.bigger700 = false;
    }
  }

  hoverOn(event: any) {
    if (!event.target.classList.contains('link-active'))
      if (
        event.target != this.lastHoverTarget ||
        (event.target == this.lastHoverTarget &&
          Date.now() - this.hoverTimer > 210)
      ) {
        event.target.lastChild.style.left = '0%';
        event.target.lastChild.classList.add('transition-left');
      }
  }
  hoverOff(event: any) {
    if (!event.target.classList.contains('link-active')) {
      this.hoverTimer = Date.now();
      this.lastHoverTarget = event.target;
      event.target.lastChild.style.left = '110%';

      setTimeout(() => {
        event.target.lastChild.classList.remove('transition-left');
        event.target.lastChild.style.left = '';
        setTimeout(() => {
          event.target.lastChild.classList.add('transition-left');
        }, 10);
      }, 210);
    }
  }
  resetHoverLine(event: any) {
    event.target.lastChild.classList.remove('transition-left');
    event.target.lastChild.style.left = '';
    setTimeout(() => {
      event.target.lastChild.classList.add('transition-left');
    }, 10);
  }
}
