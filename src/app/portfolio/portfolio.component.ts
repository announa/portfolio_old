import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  projects = [
    {
      title: 'Bitcoin App',
      description:
        'A BTC/USD exchange calculator which also shows the historic exchange rate over a chosen period',
      url: 'https://annaludewig.net/projects/bitcoin-app/index.html',
      img: 'bitcoin.png',
    },
    {
      title: 'El Pollo Loco',
      description: 'A jump and run game written in JavaScript',
      url: 'https://annaludewig.net/projects/el_pollo_loco/index.html',
      img: 'pollo_loco.png',
    },
    {
      title: 'Pokedex',
      description: 'A pokemon gallery using the pokeapi',
      url: 'https://annaludewig.net/projects/pokedex/index.html',
      img: 'pokedex.png',
    },
    {
      title: 'Ring of Fire',
      description:
        'A multiplayer online card game, built with Angular and TypeScript',
      url: 'https://ring-of-fire-7eef3.web.app/',
      img: 'ring_of_fire.png',
    },
  ];

  observer!: IntersectionObserver;

  @ViewChildren('projectItem') projectItemList!: QueryList<any>;
  @ViewChild('portfolio') portfolio!: ElementRef
  @ViewChild('portfolioHeading') portfolioHeading!: ElementRef
  @HostListener("document:scroll", ['$event'])
  fadeComponent($event:Event){ 
  }
/*   let scrollOffset = $event.srcElement.children[0].scrollTop;
  console.log("window scroll: ", scrollOffset); */

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {

    const options = {
      root: null,
      rootMargin: "-125px",
      threshold: .4
    }
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
         if(e.isIntersecting){
          e.target.classList.add('o-1')
        } else{
          e.target.classList.remove('o-1')
        }
        /* this.observer.unobserve(e.target); */
      })
    }, options);

    this.projectItemList.forEach((p) => this.observer.observe(p.nativeElement));
    this.observer.observe(this.portfolioHeading.nativeElement);
  }
}
