import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @Input() mode: 'login' | 'signup' = 'login';
  authForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.mode = data['mode'] || 'login';
    });
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(
            /^(?=(.*\d.*))(?=(.*[a-z].*))(?=(.*[A-Z].*))(?=(.*[~!@#$%^&*()\-_+=\{\[\}|\\:;"'<,>.?/].*))[^a-zA-Z0-9]*(?!.*(\d)\1{2})(?!.*([a-zA-Z])\2\2)(?!.*(?:ta|ai|ip|pt)[a-zA-Z0-9]*$)(?!.*(?:tai|aip|ipt|pt3)[a-zA-Z0-9]*$).{8,}$/
          ),
        ],
      ],
    });

    if (this.mode === 'signup') {
      this.authForm.addControl(
        'confirmPassword',
        this.fb.control('', Validators.required)
      );
    }
  }

  get CheckMatchPassword(): boolean {
    if (this.mode === 'signup') {
      const password = this.authForm.get('password')?.value;
      const confirmPassword = this.authForm.get('confirmPassword')?.value;
      return password === confirmPassword;
    }
    return true;
  }

  onSubmit() {
    if (this.authForm.invalid || !this.CheckMatchPassword) {
      this.toast.error('Form is Invalid!');
      return;
    }

    this.loading = true;
    const { email, password } = this.authForm.value;

    if (this.mode === 'signup') {
      this.authService.singUp(email, password).subscribe({
        next: () => this.toast.success('Sign Up Successfully!'),
        error: () => this.toast.error('Sign Up Error!'),
        complete: () => (this.loading = false),
      });
    } else {
      this.authService.singIn(email, password).subscribe({
        next: () => this.toast.success('Login Successfully!'),
        error: () => this.toast.error('Login Error!'),
        complete: () => (this.loading = false),
      });
    }
  }
}
