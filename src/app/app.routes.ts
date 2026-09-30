import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Imprint } from './pages/imprint/imprint';
import { Privacy } from './pages/privacy/privacy';

// Welche Adresse zeigt welche Seite?
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'imprint', component: Imprint },
  { path: 'privacy', component: Privacy },
  { path: '**', redirectTo: '' }, // unbekannte Adresse → zurück zur Startseite
];
