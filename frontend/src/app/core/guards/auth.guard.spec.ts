import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('authGuard', () => {
  let authServiceSpy: any;
  let router: Router;

  beforeEach(() => {
    const spy = { getToken: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: spy },
        provideRouter([
          { path: 'login', component: DummyComponent },
          { path: 'protected', component: DummyComponent, canActivate: [authGuard] }
        ])
      ]
    });

    authServiceSpy = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow navigation if token exists', async () => {
    authServiceSpy.getToken.mockReturnValue('valid-token');
    const result = await router.navigateByUrl('/protected');
    expect(result).toBe(true);
  });

  it('should redirect to login if no token exists', async () => {
    authServiceSpy.getToken.mockReturnValue(null);
    const result = await router.navigateByUrl('/protected');
    expect(result).toBe(true);
    expect(router.url).toBe('/login');
  });
});
