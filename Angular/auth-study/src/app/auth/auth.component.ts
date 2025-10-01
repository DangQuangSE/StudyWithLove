import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Input() mode: 'login' | 'signup' = 'login';
  authForm!: FormGroup;
  loading: boolean = false;
  showPasswordTooltip = false;
  passwordRules = [
    { text: 'Tối đa 30 kí tự', valid: false },
    { text: 'Tối thiểu 6 kí tự', valid: false },
    { text: 'Ít nhất 1 chữ số', valid: false },
    { text: 'Ít nhất 1 chữ thường', valid: false },
    { text: 'Ít nhất 1 chữ hoa', valid: false },
    { text: 'Ít nhất 1 kí tự đặc biệt', valid: false },
    { text: 'Không chứa 3 kí tự liên tục của email', valid: false },
    { text: 'Không lặp liên tục 3 kí tự', valid: false },
  ];
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
    this.authForm.valueChanges.subscribe(() => {
      this.validatePassword();
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
  validatePassword() {
    const password = this.authForm.get('password')?.value || '';
    const email = this.authForm.get('email')?.value || '';
    this.passwordRules[0].valid = password.length <= 30;
    this.passwordRules[1].valid = password.length >= 6;
    this.passwordRules[2].valid = /\d/.test(password);
    this.passwordRules[3].valid = /[a-z]/.test(password);
    this.passwordRules[4].valid = /[A-Z]/.test(password);
    this.passwordRules[5].valid = /[`~!@#$%^&*()\-_+=\{\[\}|\\:;"'<,>.?/]/.test(
      password
    );
    let emailLower = email.toLowerCase();
    let passwordLower = password.toLowerCase();
    let hasEmailSubstr = false;
    for (let i = 0; i < emailLower.length - 2; i++) {
      const sub = emailLower.substring(i, i + 3);
      if (sub.length === 3 && passwordLower.includes(sub)) {
        hasEmailSubstr = true;
        break;
      }
    }
    this.passwordRules[6].valid = !hasEmailSubstr;
    this.passwordRules[7].valid = !/(.)\1\1/.test(password);
  }
  onSubmit() {
    if (this.authForm.invalid || !this.CheckMatchPassword) {
      this.toast.error('Form is Invalid!');
      return;
    }

    this.loading = true;
    const { email, password } = this.authForm.value;

    if (this.mode === 'signup') {
      this.authService.signUp(email, password).subscribe({
        next: () => this.toast.success('Sign Up Successfully!'),
        error: () => this.toast.error('Sign Up Error!'),
        complete: () => (this.loading = false),
      });
    } else {
      this.authService.signIn(email, password).subscribe({
        next: () => this.toast.success('Login Successfully!'),
        error: () => this.toast.error('Login Error!'),
        complete: () => (this.loading = false),
      });
    }
  }
}
