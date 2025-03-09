import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-restore-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restore-email.component.html',
  styleUrl: './restore-email.component.css'
})
export class RestoreEmailComponent {
  Email_user: string = '';

  Restore_email(){
    
  }
}
