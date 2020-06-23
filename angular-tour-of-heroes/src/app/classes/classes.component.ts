import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HeroService } from '../hero.service';
import { HeroClass, Hero, AttackType } from '../hero';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  constructor(private heroService: HeroService,  public dialog: MatDialog) { }
  heroClasses: HeroClass[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit(): void {
    this.getHeroClasses();
  }
  getHeroClasses(){
    this.heroService.getHeroClasses()
      .subscribe(heroClasses => {
        this.heroClasses = heroClasses;
        this.dataSource = new MatTableDataSource<HeroClass>(this.heroClasses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
  delete(heroClass: HeroClass){
    this.dialog.open(DeleteClassDialog, {
      data: {
        heroClass: heroClass
      }
    }).afterClosed().subscribe(result => {
      if (result){
        this.heroService.deleteHeroClass(heroClass)
        .subscribe(_ => {
          this.heroClasses = this.heroClasses.filter(h => h !== heroClass);
          this.dataSource.data = this.heroClasses;
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  add(){
    this.dialog.open(AddHeroClassDialog, {
      data:{ 
        id: genId(this.heroClasses)
      }
    }).afterClosed().subscribe((heroClass:HeroClass) => {
      // heroClass = {...this.heroClasses[0]};
      // heroClass.id = this.genId(this.heroClasses);
      console.log(heroClass);
     if(heroClass){
        this.heroService.addHeroClass(heroClass)
          .subscribe(heroClass => {
            console.log(heroClass);
            this.dataSource.data.push(heroClass);
            this.dataSource.paginator.length++;
            this.dataSource.data = this.dataSource.sortData(this.dataSource.data, this.dataSource.sort);
          });
       }
    })
  }
  
}
function genId(heroClass: HeroClass[]): number {
    return heroClass.length > 0 ? Math.max(...heroClass.map(hero => hero.id)) + 1 : 1;
  }

@Component({
  selector: "add-hero-class-dialog",
  templateUrl: "add-hero-class-dialog.html"
})
export class AddHeroClassDialog {
 mControl = new FormControl();
 heroClass: HeroClass;
 attackTypes: AttackType[];
 constructor(private heroService: HeroService, @Inject(MAT_DIALOG_DATA) public data){}
 ngOnInit(){
   this.heroClass = {id: this.data.id } as HeroClass;
   this.heroService.getAttackTypes().subscribe(attackTypes => {
     this.attackTypes = attackTypes;
     this.heroClass.attackType = attackTypes[0];
   })
 }
}
@Component({
  selector:"delete-class-dialog",
  templateUrl: 'delete-class-dialog.html'
})
export class DeleteClassDialog { 
  constructor(@Inject(MAT_DIALOG_DATA) public data){}
}
