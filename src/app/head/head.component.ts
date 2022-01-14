import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  heading_1 = ['H', 'i', ',', ' ', 'I', ' ', 'a', 'm', ' ']
  heading_2 = ['A', 'n', 'n', 'a']
  animation = false;

  constructor() { }

  ngOnInit(): void {
  }

  resetAnimation(){
    setTimeout(() => {
      this.animation=false;
    }, 850);
  }
}
