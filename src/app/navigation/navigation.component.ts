import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { ProjectsService } from '../projects.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  hideElement = true;
  navOpen = false;
  @ViewChild('nav') nav!: ElementRef;
  @HostListener('window:resize', ['$event'])
  resize(){
    this.resetNav()
  }

  constructor(public navigation: NavigationService, public projects: ProjectsService, public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.hideElement = false;
    }, 1);
    
  }
  ngAfterViewInit(){
  }

  toggleMenu(){
    this.navOpen = !this.navOpen;
  }

  resetNav(){
    this.nav.nativeElement.style = '';
  }
}
