import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
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
export class NavigationComponent implements OnInit, AfterViewInit {
  hideElement = true;
  navOpen = false;
  bigger700;
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
  ngAfterViewInit() {}

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
}
