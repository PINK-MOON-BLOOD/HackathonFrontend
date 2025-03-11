import { Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';
import { Page5Component } from './page5/page5.component';
import { Page6Component } from './page6/page6.component';
import { Page7Component } from './page7/page7.component';
import { Page8Component } from './page8/page8.component';
import { LoginComponent } from './login/login.component'; 
import { RegistrationComponent } from './registration/registration.component'; 
import { ChooseRestoreComponent } from './choose-restore/choose-restore.component';
import { RestoreEmailComponent } from './restore-email/restore-email.component';
import { RestorePhoneComponent } from './restore-phone/restore-phone.component';
import { LoginAdnRegestService } from './login-adn-regest.service';
import { NewPassword1Component } from './new-password1/new-password1.component';
import { NewPassword2Component } from './new-password2/new-password2.component';
import { NewPage2OnlytextComponent } from './new-page2-onlytext/new-page2-onlytext.component';


export const routes: Routes = [
  {path: 'page1', component:Page1Component },
  {path: 'page2', component:Page2Component },
  {path: 'page3', component:Page3Component },
  {path: 'page4', component:Page4Component },
  {path: 'page5', component:Page5Component },
  {path: 'page6', component:Page6Component },
  {path: 'page7', component:Page7Component },
  {path: 'page8', component:Page8Component },
  {path: 'login' , component:LoginComponent},
  {path: 'registration' , component:RegistrationComponent},
  {path: 'choose-restore' , component:ChooseRestoreComponent},
  {path: 'restore-email' , component:RestoreEmailComponent},
  {path: 'restore-phone' , component:RestorePhoneComponent},
  {path: 'new-password1' , component:NewPassword1Component},
  {path: 'new-password2' , component:NewPassword2Component},
  {path: 'new-page2-onlytext' , component:NewPage2OnlytextComponent}

];
