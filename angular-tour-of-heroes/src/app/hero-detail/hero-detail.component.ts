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
    this.route.url.subscribe(res => {
      console.log(res)
      if(res[0].path === "detail"){
        this.location.back();
      }
    })
    
  }
  ngOnInit(): void {
    this.getHero();
  }
  ngOnChanges(){
    if (this.heroClasses){
      this.hero.heroClass = this.heroClasses.find(el => el._id == this.hero.heroClass._id);
    }
  }
  getHero(): void {
    if(this.hero){
      this.heroService.getHeroClasses().subscribe(heroClasses => {
        this.heroClasses = heroClasses;
        console.log(this.heroClasses);
        console.log(this.hero)
        
      })
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero; 
      console.log(hero);
      this.heroService.getHeroClasses()
        .subscribe(classes => {
          console.log(classes)
          this.heroClasses = classes; 
          
        });  
      console.log(this.hero)
    });
    
    // combineLatest(this.heroService.getHero(id), this.heroService.getHeroClasses())
    //   .subscribe((observer) => {   
    //       this.hero = observer[0];
    //       this.heroClasses = observer[1];
    //       console.log(this.heroClasses);
    //       console.log(this.hero);
    //     }
    //   );
  }
  save(): void {
    console.log(this.hero)
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
