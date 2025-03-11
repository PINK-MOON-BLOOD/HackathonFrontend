import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginAdnRegestService } from './login-adn-regest.service';
import { getAuth, signOut } from 'firebase/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  // title = 'Hackathon';

  public isLogged: boolean = false;

  constructor(private router: Router, private http: HttpClient, private loginAdnRegestService: LoginAdnRegestService) {
    this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn;  // Оновлюємо стан isLogged при зміні
    });
  }

  // logout(){
  //   localStorage.removeItem('token');
  //   this.loginAdnRegestService.changeLoginState(false);
  //  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        this.loginAdnRegestService.changeLoginState(false);
        this.router.navigate(['']); // Перенаправлення після виходу
      })
      .catch((error) => {
        console.error("Помилка при виході:", error);
      });
  }

  ngOnInit(): void {
    // const auth = getAuth();
  
    // auth.onAuthStateChanged((user) => {
    //   if (user || localStorage.getItem('token')) {
    //     this.loginAdnRegestService.changeLoginState(true);
    //   } else {
    //     this.loginAdnRegestService.changeLoginState(false);
    //   }
    // });
  }

  

}
