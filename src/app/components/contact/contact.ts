import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ReactiveFormsModule, TranslatePipe],
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

  // 'idle' = noch nichts gesendet, 'success' / 'error' = Ergebnis des letzten Sendens
  sendStatus: 'idle' | 'success' | 'error' = 'idle';

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
        this.sendStatus = 'success';
        this.sendMailForm.reset();
      } else {
        this.sendStatus = 'error';
        console.error('Fehler beim Senden:', result.error);
      }
    } catch (error) {
      this.sendStatus = 'error';
      console.error('Netzwerkfehler:', error);
    }
  }
}
