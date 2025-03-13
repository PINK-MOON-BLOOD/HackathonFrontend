import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginAdnRegestService } from './login-adn-regest.service';
import { SpeakTextService } from './speak-text.service';
import { DaltonizmService } from './daltonizm.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {

  isDarkMode = false;

  isOpen = false;
  isOpen_StyleMode = false;
  public selectedClass: any = {};
  public isLogged: boolean = false;

  constructor(
     private router: Router, 
     private http: HttpClient,
     private loginAdnRegestService : LoginAdnRegestService,
     private speakTextService : SpeakTextService,
     private daltonizmService : DaltonizmService,
     private renderer2 : Renderer2,
     @Inject(DOCUMENT) private document : Document, ) {
      
      this.loadTheme();
     }

 ngOnInit(): void {
     const parselocalstorage = localStorage.getItem('Style_for_daltonic');
    
      if(parselocalstorage){
        try{
          this.selectedClass = JSON.parse(parselocalstorage);
          this.daltonizmService.changeClass(this.selectedClass);
        }catch (error){
          console.log("'Не вдалося розпарсити дані з localStorage:', e");
          localStorage.removeItem('Style_for_daltonic');
        }
      }

       this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn =>{
      this.isLogged = isLoggedIn;
    });

  this.daltonizmService.selectedClass$.subscribe(selectedClass =>{
    this.selectedClass = selectedClass;
  });

  }
  Reset_style(){
    this.daltonizmService.changeClass({
      navi: true,
      footer: true,
      'bg-nav': true,
      'error': true,
    });

    localStorage.removeItem('Style_for_daltonic');
    localStorage.setItem("Style_for_daltonic",JSON.stringify({
      navi: true,
      footer: true,
      'bg-nav': true,
      'error': true,
    }));
    this.isOpen = false;
  }

  Protonopia(){
    this.daltonizmService.changeClass({
      'bg-nav-Protonopia': true,
      'footer-Protonopia': true,
      'navi-Protonopia': true,
      'error-Protonopia': true,
    });

    localStorage.removeItem('Style_for_daltonic');
    localStorage.setItem('Style_for_daltonic', JSON.stringify({
      'bg-nav-Protonopia': true,
      'footer-Protonopia': true,
      'navi-Protonopia': true,
      'error-Protonopia': true,
    }));
    this.isOpen = false;

  }

  Deuternopiy(){
    this.daltonizmService.changeClass({
      navi: true,
      footer: true,
      'bg-nav': true,
      'error': true,
    });

    localStorage.removeItem('Style_for_daltonic');
    localStorage.setItem('Style_for_daltonic', JSON.stringify({
      navi: true,
      footer: true,
      'bg-nav': true,
      'error': true,
    }));
    this.isOpen = false;

  }

  Tritanopia(){
    this.daltonizmService.changeClass({
      'bg-nav-Tritanopia': true,
      'footer-Tritanopia': true,
      'navi-Tritanopia': true,
      'bc-Tritanopia': true,
      'input-Tritanopia': true, 
      'list_a for_email-Tritanopia for_phone-Tritanopi': true, 
       '.list_a .for_email-Tritanopia:hover, .for_phone-Tritanopia:hover': true, 
    });

    localStorage.removeItem('Style_for_daltonic');
    localStorage.setItem('Style_for_daltonic', JSON.stringify({
      'bg-nav-Tritanopia': true,
      'footer-Tritanopia': true,
      'navi-Tritanopia': true,
      'bc-Tritanopia': true,
      'input-Tritanopia': true, 
      'list_a for_email-Tritanopia for_phone-Tritanopi': true, 
       '.list_a .for_email-Tritanopia:hover, .for_phone-Tritanopia:hover': true, 
    }));
    this.isOpen = false;

  }

  MonoHromazia(){
    this.daltonizmService.changeClass({
     'bg-nav-MonoHromazia': true,
      'footer-MonoHromazia': true,
      'navi-MonoHromazia': true,
      'input-MonoHromazia': true,
      'bc-MonoHromazia': true,
      'list_a for_email-Tritanopia for_phone-Tritanopi': true, 
      '.list_a .for_email-Tritanopia:hover, .for_phone-Tritanopia:hover': true, 
      'error-MonoHromazia': true, 

    });
    localStorage.removeItem('Style_for_daltonic');
    localStorage.setItem('Style_for_daltonic',JSON.stringify({
      'bg-nav-MonoHromazia': true,
      'footer-MonoHromazia': true,
      'navi-MonoHromazia': true,
      'input-MonoHromazia': true,
      'bc-MonoHromazia': true,
      'list_a for_email-Tritanopia for_phone-Tritanopi': true, 
      '.list_a .for_email-Tritanopia:hover, .for_phone-Tritanopia:hover': true, 
      'error-MonoHromazia': true, 
    }));
    this.isOpen = false;

  }
 

  // speakthis(){
  // }
  // SpeakStop(){
  // }

  logout(){
    localStorage.removeItem('token');
    this.loginAdnRegestService.changeLoginState(false);
   }
   
   toggleDropdown(){
      this.isOpen = !this.isOpen, this.isOpen_StyleMode=false;
   }
   toggleDropdown_style(){
    this.isOpen_StyleMode = !this.isOpen_StyleMode, this.isOpen= false;
   }

   toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    
    this.renderer2.setAttribute(this.document.body, 'data-bs-theme', theme);
    localStorage.setItem('theme', theme);
   }

   loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    this.renderer2.setAttribute(this.document.body, 'data-bs-theme', savedTheme);
  }

}
