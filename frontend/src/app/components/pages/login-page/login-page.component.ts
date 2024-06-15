import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css', 
})

export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pw: ['', [Validators.required]],
    });
  };

  get formControls() {
    return this.loginForm.controls;
  };

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid)
      return;
    alert(`email: ${this.formControls.email.value}, password: ${this.formControls.pw.value}`);
  }
}
