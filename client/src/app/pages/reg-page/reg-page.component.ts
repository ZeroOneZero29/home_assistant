import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reg-page',
  imports: [ReactiveFormsModule],
  templateUrl: './reg-page.component.html',
  styleUrl: './reg-page.component.scss',
})
export class RegPageComponent {
  router = inject(Router);
  authService = inject(AuthService);

  myErorr = null;

  regForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onReg() {
    if (this.regForm.valid) {
      //@ts-ignore
      this.authService.regestration(this.regForm.value).subscribe((res) => {
        this.router.navigate(['login']);
      });
      console.log(this.regForm.value);
    }
  }
}
