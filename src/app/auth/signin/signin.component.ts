import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  passwordVisibility = signal<boolean>(false);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.min(6), Validators.required],
    }),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe({
      next: (value) => {
        console.log('email: ', value.email);
        console.log('password: ', value.password);
      },
    });
  }

  get isMailValid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.valid
    );
  }

  get isPasswordValid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.valid
    );
  }

  togglePasswordVisibility() {
    this.passwordVisibility.set(!this.passwordVisibility());
  }

  onSubmit() {
    if (this.form.invalid) return;

    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.signInUser(email!, password!).subscribe({
      next: (response) => {
        const token = response.accessToken;
        console.log(token);
        localStorage.setItem('accessToken', token);
        alert(`Successfully loggedIn: ${token}`);
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert(error);
      },
    });
    console.log(email, password);
  }
}
