import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  hideElement = true;

  constructor(public navigation: NavigationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.hideElement = false;
    }, 1);
    
  }
  ngAfterViewInit(){
  }

}
