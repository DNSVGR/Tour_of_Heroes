import { Injectable } from '@angular/core';
import { Hero, HeroClass, AttackType } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap, delay, debounceTime, subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private heroClassesUrl = 'api/heroClasses';
  private attackTypesUrl = "api/attackTypes";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.messageService.add("recived a hero")),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  getHeroClasses(): Observable<HeroClass[]> {
    const url = `${this.heroClassesUrl}`
    return this.http.get<HeroClass[]>(url).pipe(
      tap(_ => this.messageService.add("revived hero classes"))
    )
  }
  constructor(private messageService: MessageService, private http: HttpClient,) { }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  updateHero(hero: Hero): Observable<any> {
    console.log(hero);
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  deleteHeroClass(heroClass: HeroClass | number): Observable<HeroClass> {
    const id = typeof heroClass === 'number' ? heroClass : heroClass.id;
    const url = `${this.heroesUrl}/${id}`;

    //TODO: move verification to server
    var obs = new Observable<HeroClass>(sub => {
      this.http.get<Hero[]>(`${this.heroesUrl}/?heroClassId=${id}`).pipe(
        tap(x => {
            x.length ? this.log(`found matching hero for hero class "${id}"`) :
                      this.log(`no heros matching "${id}"`);
            console.log(x);
          },
        catchError(this.handleError<Hero[]>('searchHeroClasses', []))
      )).subscribe(x => {
        if(x.length == 0){
          this.http.delete<HeroClass>(this.heroClassesUrl+"/"+id, this.httpOptions).pipe(
            tap(_ => this.log(`deleted heroClasses id=${id}`)),
            //catchError(this.handleError<HeroClasses>('deleteHeroClass'))
          ).subscribe(_ => {
            sub.next(_ as HeroClass);
            console.log("deleted class" + _)
          })
        }
      })
    });
    return obs;
  }

  addHeroClass(heroClass: HeroClass){
    console.log("trying to post:", heroClass)
    return this.http.post<HeroClass>(this.heroClassesUrl, heroClass, this.httpOptions).pipe(
      tap((newHeroClass: HeroClass) => this.log(`added hero Class w/ id=${newHeroClass.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  getAttackTypes(): Observable<AttackType[]> {
    const url = `${this.attackTypesUrl}`
    return this.http.get<AttackType[]>(url).pipe(
      tap(_ => this.messageService.add("revived hero classes"))
    )
  }
  deleteAttackType(attackType: AttackType | number): Observable<AttackType> {
    const id = typeof attackType === 'number' ? attackType : attackType.id;
    const url = `${this.heroClassesUrl}`;

    //TODO: move verification to server
    var obs = new Observable<AttackType>(sub => {
      this.http.get<HeroClass[]>(`${url}/?attackTypeId=${id}`).pipe(
        tap(x => {
            x.length ? this.log(`found matching hero class for attack type "${id}"`) :
                      this.log(`no hero class matching "${id}"`);
            console.log(x);
          },
        catchError(this.handleError<Hero[]>('searchAttackTypes', []))
      )).subscribe(x => {
        if(x.length == 0){
          this.http.delete<AttackType>(this.attackTypesUrl+"/"+id, this.httpOptions).pipe(
            tap(_ => this.log(`deleted attackType id=${id}`)),
            catchError(this.handleError<Hero>('deleteAttackType'))
          ).subscribe(_ => {
            sub.next(_ as AttackType);
            console.log("deleted class" + _)
          })
        }
      })
    });
    return obs;
  }
  addAttackType(attackType: AttackType){
    console.log("trying to post:", attackType)
    return this.http.post<AttackType>(this.attackTypesUrl, attackType, this.httpOptions).pipe(
      tap((newAttackType: AttackType) => this.log(`added Attack Type w/ id=${newAttackType.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
}