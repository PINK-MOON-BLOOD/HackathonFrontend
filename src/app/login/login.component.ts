import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdnRegestService } from '../login-adn-regest.service';
import { DaltonizmService } from '../daltonizm.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  passwordVisible: boolean = false;

  selectedClass: any ={};

  Login_user: string ='';
  Password_user: string ='';
  errorMessage: string | null = null;
  isLoggedIn: boolean = false;

  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private http: HttpClient, private router: Router, private loginAdnRegestService: LoginAdnRegestService,  private daltonizmService: DaltonizmService,) {
    
  }
  ngOnInit(): void {
    this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn =>{
      this.isLoggedIn = isLoggedIn;
    });

    this,this.daltonizmService.selectedClass$.subscribe(selectedClass =>{
      this.selectedClass = selectedClass;
    });
  }


  Login_with_Google() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }


  Login(){
    const LoginData = {
      login: this.Login_user,
      password: this.Password_user
    };

    this.http.post('http://localhost:8080/api/users/login', LoginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);

          // Збереження токена в localStorage
          localStorage.setItem('token', response.token);

          // Оновлення стану логіну
          this.loginAdnRegestService.changeLoginState(true);

          // Перенаправлення користувача на сторінку, вказану сервером
          const redirectUrl = response.redirect || ' ';
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          this.errorMessage = 'Login failed';
          console.error('Login failed', error);
        }
      });
  }
}
