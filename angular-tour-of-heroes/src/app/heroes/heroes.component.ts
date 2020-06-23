import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Hero, HeroClass } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  dataSource = new MatTableDataSource<Hero>(this.heroes);
  selectedRow: HTMLElement;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) matTable: MatTable<Hero>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private heroService: HeroService, private messageService: MessageService, public dialog: MatDialog) { }
  
  selecHero(event, hero: Hero){
    if(this.selectedRow){
      this.selectedRow.classList.remove("selected");
    }
    this.selectedRow = event.srcElement.parentElement
    this.selectedRow.classList.add("selected");
    this.selectedHero = hero;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.getHeroes();
    
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes;
          this.dataSource = new MatTableDataSource<Hero>(this.heroes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }
  add(): void {
    this.dialog.open(AddHeroDialog).afterClosed().subscribe((hero:Hero) => {
      console.log("hero: ",hero);
      if(hero){
        this.heroService.addHero(hero)
          .subscribe(hero => {
            console.log(hero);
            this.dataSource.data.push(hero);
            this.dataSource.paginator.length++;
            this.dataSource.data = this.dataSource.sortData(this.dataSource.data, this.dataSource.sort);
          });
        }
    })
    
    
    
  }
  delete(hero: Hero): void {
    this.dialog.open(DeleteDialog, {
      data: {
        hero: hero
      }
    }).afterClosed().subscribe(result => {
      if (result){
        this.heroService.deleteHero(hero).subscribe(_ => {
          this.heroes = this.heroes.filter(h => h !== hero);
          this.dataSource.data = this.heroes;
          this.dataSource.paginator = this.paginator;
        });
      }
    })
    
  }
}

@Component({
  selector:"delete-dialog",
  templateUrl: 'delete-dialog.html'
})
export class DeleteDialog { 
  constructor(@Inject(MAT_DIALOG_DATA) public data){}
}

 @Component({
   selector: "add-hero-dialog",
   templateUrl: "add-hero-dialog.html"
 })
 export class AddHeroDialog {
  mControl: FormControl[] =[];
  heroClasses: HeroClass[];
  hero: Hero;
  constructor(private heroService: HeroService){}
  ngOnInit(){
    
    for(let i = 0; i < 5; i++) this.mControl.push(new FormControl());
    this.heroService.getHeroClasses().subscribe(heroClasses => {
      this.heroClasses = heroClasses;
      this.hero.heroClass = heroClasses[0];
    })
    this.hero = {name: "",  level: 1, age: 0} as Hero;
  }
  valid(){
    var ans = true;
    for(let i = 0; i < this.mControl.length; i++){
      ans = ans && this.mControl[i].valid;
    }
    console.log(this.mControl[3]);
    return ans;
  }
 }
 