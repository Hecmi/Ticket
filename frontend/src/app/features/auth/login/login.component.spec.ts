import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { vi } from 'vitest';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: any;
  let router: Router;

  beforeEach(async () => {
    const spy = { login: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, 
        ReactiveFormsModule, 
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with invalid form', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
    
    emailControl?.setValue('test@test.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should call authService and navigate on success', () => {
    authServiceSpy.login.mockReturnValue(of({ status: 'success', data: { user: {}, token: 'abc' } }));
    
    component.loginForm.setValue({
      email: 'test@test.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/tickets']);
  });

  it('should show error message on login failure', () => {
    authServiceSpy.login.mockReturnValue(throwError(() => ({ error: { message: 'Invalid credentials' } })));
    
    component.loginForm.setValue({
      email: 'test@test.com',
      password: 'wrongpass'
    });

    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid credentials');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
