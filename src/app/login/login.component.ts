import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdnRegestService } from '../login-adn-regest.service';
// import { firebaseConfig } from '../../environments/environment';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut, onAuthStateChanged, signInWithCredential } from 'firebase/auth';


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

  provider: GoogleAuthProvider;

  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private http: HttpClient, private router: Router, private loginAdnRegestService: LoginAdnRegestService) {
    // Підписка на зміну стану логіну
    this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn =>{
      this.isLoggedIn = isLoggedIn;
    });

    this.provider = new GoogleAuthProvider();
  }

  ngOnInit() {
    const auth = getAuth();
  
    // Відстеження стану аутентифікації (перевірка після перезавантаження сторінки)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('token', user.refreshToken);
        this.loginAdnRegestService.changeLoginState(true);  // Оновлюємо стан після входу
      } else {
        this.loginAdnRegestService.changeLoginState(false);  // Якщо користувач не аутентифікований
      }
    });
  
    // Отримання користувача після редіректу
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          localStorage.setItem('token', result.user.refreshToken);
          this.loginAdnRegestService.changeLoginState(true);  // Оновлюємо стан після входу через Google
        }
      })
      .catch((error) => {
        console.error("Помилка автентифікації через Google:", error);
        this.errorMessage = "Помилка входу через Google. Спробуйте ще раз.";
      });
  
    // Якщо користувач вже увійшов раніше, оновлюємо стан
    if (auth.currentUser || localStorage.getItem('token')) {
      this.loginAdnRegestService.changeLoginState(true);  // Якщо є токен, оновлюємо стан
    }
  }

  Login_with_Google(){
    const auth = getAuth();
    signInWithRedirect(auth, this.provider);
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
