import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {LoginAdnRegestService} from '../login-adn-regest.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-page8',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './page8.component.html',
  styleUrl: './page8.component.css'
})
export class Page8Component implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private loginAdnRegestService: LoginAdnRegestService,
              private route: ActivatedRoute ) {
    this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn =>{
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {
    console.log("🔥 Компонент Page8 завантажено!");
    console.log("📍 Поточний URL:", window.location.href);

    this.route.queryParams.subscribe(params => {
      console.log("🔍 Отримані queryParams:", params);

      if (params['token']) {
        console.log("✅ Токен знайдено:", params['token']);

        // Зберігаємо токен у LocalStorage
        localStorage.setItem('token', params['token']);

        this.loginAdnRegestService.changeLoginState(true);

        // Перенаправлення користувача на сторінку, вказану сервером
        this.router.navigate(['/']);
      } else {
        console.warn("❌ Токен відсутній у URL");
      }
    });
  }
}
