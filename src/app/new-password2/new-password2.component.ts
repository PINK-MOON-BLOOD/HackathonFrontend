import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-new-password2',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './new-password2.component.html',
  styleUrl: './new-password2.component.css'
})
export class NewPassword2Component {

  New_password: string = '';
  errorMessage: string | null = null;

  constructor(private router:Router, private http:HttpClient){}

  New_passwor_for_email() {
    const token = new URLSearchParams(window.location.search).get('token'); // Отримати токен з URL
    if (!token) {
      this.errorMessage = 'Invalid or missing token';
      return;
    }

    const new_pass = {
      newPassword: this.New_password
    };

    this.http.post(`http://localhost:8080/api/users/reset-password-email?token=${token}`, new_pass)
      .subscribe({
        next: (response: any) => {
          console.log('Restore Successful', response);
          this.router.navigate(['/login']); // Перенаправлення після успішного відновлення
        },
        error: (error) => {
          this.errorMessage = 'Restore Failed';
          console.error('Restore failed', error);
        }
      });
  }

}
