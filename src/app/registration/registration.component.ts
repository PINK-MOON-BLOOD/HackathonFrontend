import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DaltonizmService } from '../daltonizm.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  passwordVisible: boolean = false;

  selectedClass: any = {};

  Name_user: string ='';
  Surname_user: string ='';
  Email_user: string ='';
  Phone_user: string ='';
  Login_user: string ='';
  Password_user: string ='';
  errorMessage: string | null = null;

  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private http: HttpClient, private router: Router, private daltonizmService : DaltonizmService) {}

  ngOnInit(): void {
      this.daltonizmService.selectedClass$.subscribe(selectedClass =>{ 
          this.selectedClass = selectedClass;
      });
  }

  Login_with_Google(){

  }

  Register_with_Google() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  register(){

    const registrationData = {
      firstName: this.Name_user,
      lastName: this.Surname_user,
      email: this.Email_user,
      phoneNumber: this.Phone_user,
      login: this.Login_user,
      password: this.Password_user
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };


    this.http.post('http://localhost:8080/api/users/register', registrationData, httpOptions)
      .subscribe({
        next: (response) => {
          console.log('Response status:', response.status);
          console.log('Response body:', response.body);
          if (response.status === 201) {
            console.log('Реєстрація успішна', response);
            this.router.navigate(['/login']);
            window.location.reload;
          } else {
            this.errorMessage = 'Сталася невідома помилка';
          }
        },
        error: (error) => {
          console.error('Помилка:', error);
          if (error.status === 409) {
            this.errorMessage = 'Користувач з такою поштою вже існує';
          } else {
            this.errorMessage = 'Реєстрація не вдалася';
          }
        }

      });
  }
}
