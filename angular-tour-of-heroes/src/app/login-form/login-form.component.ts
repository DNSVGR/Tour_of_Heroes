import { Component, OnInit, Input, Output } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };
  @Input() userName: string;
  @Input() password: string;
  @Output() isLogged = new EventEmitter();
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  login(): void { 
    var user = {
      'userName': this.userName,
      'password': this.password
    }
    this.http.post<string>('http://localhost:3000/api/auth/genToken', user).subscribe(data => {
      this.cookieService.set('Authorization', 'berear ' + data);
      console.log(data);
      this.isLogged.emit();
    })
  }
}
