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
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\p{L}+(?:[ '-]\p{L}+)*$/u),
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/)],
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    privacy: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  sendStatus = signal<'idle' | 'success' | 'error'>('idle');

  private toastTimer?: ReturnType<typeof setTimeout>;

  get nameControl() {
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
    if (this.sendMailForm.invalid) return;
    const formValues = this.sendMailForm.value;
    try {
      const httpResponse = await fetch('sendMail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.senderName,
          email: formValues.email,
          message: formValues.message,
        }),
      });

      const result = await httpResponse.json();

      if (result.success) {
        this.showToast('success');
        this.sendMailForm.reset();
      } else {
        this.showToast('error');
      }
    } catch {
      this.showToast('error');
    }
  }

  private showToast(status: 'success' | 'error') {
    clearTimeout(this.toastTimer);
    this.sendStatus.set(status);
    this.toastTimer = setTimeout(() => this.sendStatus.set('idle'), 4000);
  }
}
