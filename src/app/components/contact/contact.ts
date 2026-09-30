import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  sendMailForm = new FormGroup({
    senderName: new FormControl('', {
      // pattern: nur Buchstaben (auch ä, ß, é …), einzelne Leerzeichen/Bindestriche/Apostrophe
      // zwischen Namensteilen – keine Leerzeichen am Anfang/Ende, keine Zahlen/Sonderzeichen
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\p{L}+(?:[ '-]\p{L}+)*$/u),
      ],
    }),
    email: new FormControl('', {
      // pattern statt Validators.email: verlangt zusätzlich eine Endung wie .de / .com
      // (Validators.email würde auch "anna@web" durchlassen, die PHP-Datei aber nicht)
      validators: [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/)],
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    // requiredTrue: gültig erst, wenn die Checkbox angehakt ist
    privacy: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  // 'idle' = kein Toast sichtbar, 'success' / 'error' = Toast mit Ergebnis des letzten Sendens
  // signal, weil die App ohne zone.js läuft: nur so merkt Angular die Änderung nach await / setTimeout
  sendStatus = signal<'idle' | 'success' | 'error'>('idle');

  // Merkt sich den laufenden Timer, damit ein neuer Toast den alten Timer abbrechen kann
  private toastTimer?: ReturnType<typeof setTimeout>;

  get senderName() {
    return this.sendMailForm.get('senderName');
  }

  get email() {
    return this.sendMailForm.get('email');
  }

  get message() {
    return this.sendMailForm.get('message');
  }

  get privacy() {
    return this.sendMailForm.get('privacy');
  }

  async submitSendMailForm() {
    // muss async sein weil wir await nutzen (await fetch(...) und await response.json())
    if (this.sendMailForm.invalid) return; // PRÜFEN OB FORM VALIDE, WENN NEIN return
    const { senderName, email, message } = this.sendMailForm.value; // Destructuring: Werte aus dem Formular in einzelne Variablen packen
    try {
      // !!! ACHTUNG ==>  HIER DEINE DOMAIN EINTRAGEN <== ACHTUNG !!!
      const httpResponse = await fetch('https://deine-domain.de/sendMail.php', {
        method: 'POST', // POST, weil wir Daten übermitteln wollen
        headers: { 'Content-Type': 'application/json' }, // Teilt dem Server mit, dass Daten als JSON geschickt werden
        body: JSON.stringify({
          name: senderName, // KEY muss 1:1 wie in der PHP benannt sein (daher hier "name")
          email: email,
          message: message,
        }),
      });

      const result = await httpResponse.json(); // Body der Antwort von JSON-String zurück in ein JS-Objekt umwandeln

      if (result.success) {
        this.showToast('success');
        this.sendMailForm.reset();
      } else {
        this.showToast('error');
        console.error('Fehler beim Senden:', result.error);
      }
    } catch (error) {
      this.showToast('error');
      console.error('Netzwerkfehler:', error);
    }
  }

  // Zeigt den Toast und blendet ihn nach 4 Sekunden automatisch wieder aus
  private showToast(status: 'success' | 'error') {
    clearTimeout(this.toastTimer); // alten Timer stoppen, falls noch ein Toast offen ist
    this.sendStatus.set(status);
    this.toastTimer = setTimeout(() => this.sendStatus.set('idle'), 4000);
  }
}
