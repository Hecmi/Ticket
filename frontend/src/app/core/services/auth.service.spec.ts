import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request and store token on login', () => {
    const mockResponse = {
      status: 'success',
      data: {
        user: { id: '1', email: 'test@test.com' },
        token: 'fake-jwt-token'
      }
    };

    service.login('test@test.com', 'password123').subscribe(res => {
      expect(res.data.token).toBe('fake-jwt-token');
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should remove token on logout', () => {
    localStorage.setItem('token', 'some-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should get token from localStorage', () => {
    localStorage.setItem('token', 'my-token');
    const token = service.getToken();
    expect(token).toBe('my-token');
  });
});
