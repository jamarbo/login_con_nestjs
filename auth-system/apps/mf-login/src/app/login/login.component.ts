import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<any>();
  @Output() loginError = new EventEmitter<string>();

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  isRegisterMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Agregar validación de nombre solo en modo registro
    this.updateNameValidation();
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.updateNameValidation();
  }

  private updateNameValidation(): void {
    const nameControl = this.loginForm.get('name');
    if (this.isRegisterMode) {
      nameControl?.setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      nameControl?.clearValidators();
    }
    nameControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.loginForm.value;

    // Preparar datos según el modo
    const requestData = this.isRegisterMode
      ? {
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
        }
      : {
          email: formValue.email,
          password: formValue.password,
        };

    const request$ = this.isRegisterMode
      ? this.authService.register(requestData as any)
      : this.authService.login(requestData);

    request$.subscribe({
      next: (response) => {
        this.isLoading = false;
        this.loginSuccess.emit(response);
        console.log('✅ Login exitoso!', response);
        console.log('Token:', response.access_token);
        console.log('Usuario:', response.user);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Error de autenticación. Intenta nuevamente.';
        this.loginError.emit(this.errorMessage);
        console.error('❌ Error de login', error);
      },
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get nameControl() {
    return this.loginForm.get('name');
  }
}
