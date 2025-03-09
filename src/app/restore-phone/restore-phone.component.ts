import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-restore-phone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restore-phone.component.html',
  styleUrl: './restore-phone.component.css'
})
export class RestorePhoneComponent {
  Phone_user: string = '';
  Restore_phone(){
    
  }
}
