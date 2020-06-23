import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AttackType, Range } from '../hero';
import { DataSource } from '@angular/cdk/table';
import { HeroService } from '../hero.service';
import { AddHeroDialog } from '../heroes/heroes.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-attack-types',
  templateUrl: './attack-types.component.html',
  styleUrls: ['./attack-types.component.scss']
})
export class AttackTypesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private heroService: HeroService,  public dialog: MatDialog) { }
  dataSource;
  attackTypes: AttackType[];
  ngOnInit(): void {
    this.getAttackTypes();
  }
  getAttackTypes(){
    this.heroService.getAttackTypes().subscribe(attackTypes => {
      this.attackTypes = attackTypes;
      this.dataSource = new MatTableDataSource<AttackType>(this.attackTypes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  add(){
    this.dialog.open(AddAttackTypeDialog, {
      data:{ 
        id: genId(this.attackTypes)
      }
    }).afterClosed().subscribe((attackType:AttackType) => {
      console.log(attackType);
     if(attackType){
        this.heroService.addAttackType(attackType)
          .subscribe(heroClass => {
            console.log(heroClass);
            this.dataSource.data.push(heroClass);
            this.dataSource.paginator.length++;
            this.dataSource.data = this.dataSource.sortData(this.dataSource.data, this.dataSource.sort);
          });
       }
    })
  }
  delete(attackType: AttackType){
    this.dialog.open(DeleteAttackDialog, {
      data: {
        attackType: attackType
      }
    }).afterClosed().subscribe(result => {
      if (result){
        this.heroService.deleteAttackType(attackType)
        .subscribe(_ => {
          this.attackTypes = this.attackTypes.filter(h => h !== attackType);
          this.dataSource.data = this.attackTypes;
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
function genId(attackType: AttackType[]): number {
  return attackType.length > 0 ? Math.max(...attackType.map(attack => attack.id)) + 1 : 1;
}
@Component({
  selector:"delete-attack-dialog",
  templateUrl: 'delete-attack-dialog.html'
})
export class DeleteAttackDialog { 
  constructor(@Inject(MAT_DIALOG_DATA) public data){}
}
@Component({
  selector: "add-attack-dialog",
  templateUrl: "add-attack-dialog.html"
})
export class AddAttackTypeDialog {
  mControl = new FormControl();
  attackType: AttackType;
  constructor(private heroService: HeroService, @Inject(MAT_DIALOG_DATA) public data){}
  ngOnInit(){
    this.attackType = {id: this.data.id } as AttackType;
    this.attackType.range= Range.Melee;
  }
 }
