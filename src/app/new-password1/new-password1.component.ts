import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DaltonizmService } from '../daltonizm.service';

@Component({
  selector: 'app-new-password1',
  standalone: true,
  imports: [CommonModule, HttpClientModule ,FormsModule],
  templateUrl: './new-password1.component.html',
  styleUrl: './new-password1.component.css'
})
export class NewPassword1Component implements OnInit{

  Token_user: string = '';
  New_password: string = '';
  errorMessage: string | null = null;

  selectedClass: any = {};

  constructor(private router: Router, private http: HttpClient, private daltonizmService : DaltonizmService) {}

  ngOnInit(): void {
    this.daltonizmService.selectedClass$.subscribe(selectedClass =>{
      this.selectedClass= selectedClass;
    });
  }

  Restore_Password(){
    const new_info = {
      token: this.Token_user,
      newPassword: this.New_password
    };

    this.http.post(' http://localhost:8080/api/users/reset-password-phone', new_info)
    .subscribe({
      next: (response: any) => {
        console.log('New password successful safe', response);
        this.router.navigate(['/'])
      },
      error: (error) => {
        this.errorMessage = 'New password Failed safe';
        console.error('New password Failed safe', error);
      }
    });
  }
}
