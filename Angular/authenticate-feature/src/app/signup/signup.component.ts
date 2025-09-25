import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // add check duplicate
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(
            /^(?=(.*\d.*))(?=(.*[a-z].*))(?=(.*[A-Z].*))(?=(.*[~!@#$%^&*()\-_+=\{\[\}|\\:;"'<,>.?/].*))[^a-zA-Z0-9]*(?!.*(\d)\1{2})(?!.*([a-zA-Z])\2\2)(?!.*(?:ta|ai|ip|pt)[a-zA-Z0-9]*$)(?!.*(?:tai|aip|ipt|pt3)[a-zA-Z0-9]*$).{8,}$/
          ),
        ],
      ],
    });
  }
  //submit form
  onSubmit() {
    if (this.signUpForm.valid) {
      this.loading = true;
      const { email, password } = this.signUpForm.value;
      this.authService.signUp(email, password).subscribe(
        (response) => {
          this.toast.success('SingUp Successfully!', 'Success');
        },
        (error) => {
          this.toast.error('SingUp fail!', 'Fail');
        }
      );
      this.loading = false;
    } else {
      this.toast.error('Invalid Form, Please Input Again!');
    }
  }
  get CheckMatchPassword() {
    const password = this.signUpForm.get('password')?.value;
    const cfPassword = this.signUpForm.get('confirmPassword')?.value;
    return password === cfPassword;
  }
}
