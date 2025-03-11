import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { initializeApp } from "firebase/app";
// import { environment, firebaseConfig } from './environments/environment';
import * as firebase from "firebase/app";
import { environment } from './environments/environment'; // Assuming firebaseConfig is part of the environment

initializeApp(environment.firebaseConfig);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  // const app = initializeApp(firebaseConfig);

