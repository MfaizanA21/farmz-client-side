import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

function matchValues(controlValue1: string, controlValue2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlValue1)?.value;
    const val2 = control.get(controlValue2)?.value;

    if(val1 === val2) {
      return null;
    }
    return {valuesNotEqual: true};
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [AuthService],
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  accountCreated = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router)

  signupForm = new FormGroup({
    fname: new FormControl('', {
      validators: [Validators.required]
    }),
    lname: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6)]
    }),
    cpassword: new FormControl('', {
      validators: [Validators.required, ]
    })
  },
  {
    validators: matchValues('password', 'cpassword')
  });


  get emailValidate() {
    return (
      this.signupForm.controls.email.touched &&
      this.signupForm.controls.email.valid &&
      this.signupForm.controls.email.dirty
    );
  }

  get passwordValidate() {
    return (
      this.signupForm.controls.password.touched &&
      this.signupForm.controls.password.valid &&
      this.signupForm.controls.password.dirty
    );
  }

  get confirmPasswordValidate() {
    return (
      this.signupForm.controls.cpassword.value ===
      this.signupForm.controls.password.value
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    const user: User = {
      fname: this.signupForm.value.fname!,
      lname: this.signupForm.value.lname!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!
    }
    this.authService.createUser(user).subscribe({
      next: () => {
        this.signupForm.reset();
        this.accountCreated.set(true);
        alert('Account created successfully!')
        this.router.navigate(['']);
      }
    });
    console.log('submit button is clicked!')
    
  }
}
