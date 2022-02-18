import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(public navigation: NavigationService, public projects: ProjectsService, public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.hideElement = false;
    }, 1);
    
  }
  ngAfterViewInit(){
  }

}
