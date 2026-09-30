import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Skills } from '../../components/skills/skills';
import { Projects } from '../../components/projects/projects';
import { Contact } from '../../components/contact/contact';

// Startseite: alle Sections, die vorher direkt in app.html standen
@Component({
  imports: [Header, Hero, About, Skills, Projects, Contact],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
