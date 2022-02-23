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
  bigger600;
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
    this.bigger600 = window.innerWidth >= 600 ? true : false;
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
    if (window.innerWidth >= 600) {
      this.navOpen = false;
      this.nav.nativeElement.style = '';
      this.bigger600 = true;
    } else {
      this.bigger600 = false;
    }
  }
}
