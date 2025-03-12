import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
@Component({
  selector: 'app-restore-email',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './restore-email.component.html',
  styleUrl: './restore-email.component.css'
})
export class RestoreEmailComponent {
  Email_user: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  Restore_email(){
    const Restore_emailData ={
      email: this.Email_user
    };

    this.http.post('http://localhost:8080/api/users/request-password-reset-email', Restore_emailData)
      .subscribe({
        next: (response: any) => {
          console.log('Restore message Successful', response);
          this.router.navigate(['/new-page2-onlytext'])
        },
        error: (error) => {
          this.errorMessage = 'Restore message Failed';
          console.error('Restore failed', error);
        }
      });
  }
}
