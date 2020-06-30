import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import { AttackTypesComponent, DeleteAttackDialog, AddAttackTypeDialog } from './attack-types/attack-types.component';
import { ClassesComponent, AddHeroClassDialog, DeleteClassDialog } from './classes/classes.component';
import {DeleteDialog, AddHeroDialog} from './heroes/heroes.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    AttackTypesComponent,
    ClassesComponent,
    DeleteDialog,
    AddHeroDialog,
    AddHeroClassDialog,
    DeleteClassDialog,
    DeleteAttackDialog,
    AddAttackTypeDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
