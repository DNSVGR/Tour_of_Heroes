import { Component, OnInit, Input } from '@angular/core';
import { Hero, HeroClass } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  heroClasses: HeroClass[];
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.getHero();
    console.log(this.hero.heroClass)
  }
  ngOnChanges(){
    if (this.heroClasses)
      this.hero.heroClass = this.heroClasses.find(el => el.id == this.hero.heroClass.id);
  }
  getHero(): void {
    if(this.hero){
      this.heroService.getHeroClasses().subscribe(heroClasses => {
        this.heroClasses = heroClasses;
        this.hero.heroClass = this.heroClasses.find(el => el.id == this.hero.heroClass.id);
      })
      return;
    }
    const id = +this.route.snapshot.paramMap.get('id');
    combineLatest(this.heroService.getHero(id), this.heroService.getHeroClasses())
      .subscribe((observer) => {
          
          this.hero = observer[0];
          this.heroClasses = observer[1];
          console.log(this.hero);
          this.hero.heroClass = this.heroClasses.find(el => el.id == this.hero.heroClass.id);
        }
      );
  }
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
