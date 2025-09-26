import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: [
        '',
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(6),
        Validators.pattern(
          /^(?=(.*\d.*))(?=(.*[a-z].*))(?=(.*[A-Z].*))(?=(.*[~!@#$%^&*()\-_+=\{\[\}|\\:;"'<,>.?/].*))[^a-zA-Z0-9]*(?!.*(\d)\1{2})(?!.*([a-zA-Z])\2\2)(?!.*(?:ta|ai|ip|pt)[a-zA-Z0-9]*$)(?!.*(?:tai|aip|ipt|pt3)[a-zA-Z0-9]*$).{8,}$/
        ),
      ],
      confirmPassword: ['', Validators.required],
    });
  }
  onsubmit() {
    if (this.signUpForm.valid) {
      this.loading = true;
      const { email, password } = this.signUpForm.value;
      this.authService.singUp(email, password).subscribe(
        (response) => {
          this.toast.success('SignUp Successfully!');
        },
        (error) => {
          this.toast.error('SignUp Error!');
        }
      );
      this.loading = false;
    } else {
      this.toast.error('Form is Invalid!');
    }
  }
  get CheckMatchPassword() {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
