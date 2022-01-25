import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() btnHome: boolean = false;

  @Input() buttonText: string = '';

  btnType = "button";

  constructor() { 
  }
  
  ngOnInit(): void {
    if(!this.btnHome){
      this.btnType = "submit";
    }
  }

}
