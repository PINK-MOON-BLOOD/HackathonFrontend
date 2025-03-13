import { Component, inject } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
;

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css',
})
export class Page1Component {
  fact: string = '';
  private http = inject(HttpClient);

  constructor() {
    this.getFact();
  }

  getFact() {
    this.http.get<{ fact: string }>('http://localhost:8080/api/fact').subscribe({
      next: (data) => (this.fact = data.fact),
      error: (err) => console.error('Помилка отримання факту:', err),
    });
  }

}
