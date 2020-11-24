import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
  links = ['dashboard', 'heroes', 'classes', 'attack-types'];
  activeLink = this.links[0];
  @Input() isLogged = false;

  constructor(private CookieService: CookieService){}
  ngOnInit() {
    this.isLogged = this.CookieService.check('Authorization');
  }
  onLogin(){
    this.isLogged = true;
    console.log(this.isLogged)
  }
}
