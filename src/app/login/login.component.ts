import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdnRegestService } from '../login-adn-regest.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;

  Login_user: string ='';
  Password_user: string ='';
  errorMessage: string | null = null;
  isLoggedIn: boolean = false;


  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private http: HttpClient, private router: Router, private loginAdnRegestService: LoginAdnRegestService) {
    this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn =>{
      this.isLoggedIn = isLoggedIn;
    });

  }

  ngOnInit() {
 
    if (localStorage.getItem('token')) {
      this.loginAdnRegestService.changeLoginState(true);  
    }
  }

  Login_with_Google(){

      // Спочатку робимо POST запит на авторизацію через Google
      this.http.post('http://localhost:8080/oauth2/authorization/google', {}).subscribe(
        (response) => {
          console.log('Google авторизація пройшла успішно', response);
  
          // Після успішної авторизації робимо GET запит на отримання поточного користувача
          this.http.get<any[]>(`http://localhost:8080/api/users/current-user`).subscribe(
            (userResponse) => {
              console.log('Поточний користувач:', userResponse);
              this.router.navigate(['/']);
            },
            (error) => {
              console.error('Помилка при отриманні поточного користувача:', error);
            }
          );
        },
        (error) => {
          console.error('Помилка при авторизації через Google:', error);
        }
      );

 
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
