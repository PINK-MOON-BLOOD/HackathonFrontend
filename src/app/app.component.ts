import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginAdnRegestService } from './login-adn-regest.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {

  public isLogged: boolean = false;

  constructor(private router: Router, private http: HttpClient, private loginAdnRegestService : LoginAdnRegestService) {
    this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn =>{
      this.isLogged = isLoggedIn;
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.loginAdnRegestService.changeLoginState(false);
   }
   
  ngOnInit(): void {
      
  }

  

}
