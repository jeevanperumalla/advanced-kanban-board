import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;

  loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  });
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
   ) { }
   onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { username, password } = this.loginForm.value;

    this.auth.login(username!, password!).subscribe(user => {
      this.loading = false;

      if (user) {
        this.snackBar.open('Login successful', 'Close', { duration: 2000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open('Invalid credentials', 'Close', { duration: 2000 });
      }
    });
  }
}
