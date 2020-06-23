import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
  links = ['dashboard', 'heroes', 'classes', 'attack-types'];
  activeLink = this.links[0];
}
