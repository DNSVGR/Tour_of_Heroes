import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { PageEvent, MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  pagePros = {
    pageIndex: 0,
    pageSize: 6,
  };
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  heroesOnPage(){
    return this.heroes.slice(this.pagePros.pageIndex * this.pagePros.pageSize, this.pagePros.pageIndex * this.pagePros.pageSize + this.pagePros.pageSize);
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.slice()
        console.log(this.heroes)
      });
  }
}