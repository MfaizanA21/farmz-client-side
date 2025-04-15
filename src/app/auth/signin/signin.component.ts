import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  
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
        console.log("email: ", value.email)
        console.log("password: ", value.password)
      }
    })
  }

  get isMailValid() {
    return (
      this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.valid
    )
  }

  get isPasswordValid() {
    return (
      this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.valid
    )
  }

  onSubmit() {
    const email = this.form.value.email
    const password = this.form.value.password
    console.log(email, password)
  }
  
}
