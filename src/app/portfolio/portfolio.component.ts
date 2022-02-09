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
import { IntersectionObserverService } from '../intersection-observer.service';

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

  @ViewChildren('projectItem') projectItemList!: QueryList<any>;
  @ViewChild('portfolio') portfolio!: ElementRef;
  @ViewChildren('portfolioHeading') portfolioHeading!: QueryList<any>;
  /* @ViewChild('portfolioHeading') portfolioHeading!: ElementRef */
  @HostListener('document:scroll', ['$event'])
  fadeComponent($event: Event) {}
  /*   let scrollOffset = $event.srcElement.children[0].scrollTop;
  console.log("window scroll: ", scrollOffset); */

  constructor(public observer: IntersectionObserverService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const observeItems = [this.projectItemList, this.portfolioHeading];
    this.observer.createIntersectionObserver(observeItems);
  }
}
