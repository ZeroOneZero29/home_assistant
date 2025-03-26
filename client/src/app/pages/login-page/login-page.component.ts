import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { TokenResponse } from '../../auth/auth.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  router = inject(Router)
  authService = inject(AuthService) 

  myErorr = null

  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  });

  onSubmit(){
    if (this.loginForm.valid){
      //@ts-ignore
      this.authService.login(this.loginForm.value).subscribe(res => {
          this.router.navigate(['device'])
      }) 
      console.log(this.loginForm.value)
    }
  }
}
