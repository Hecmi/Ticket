import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, BrowserAnimationsModule],
      providers: [provideRouter([])]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form on initialization', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should validate required fields properly', () => {
    component.registerForm.get('name')?.setValue('Test User');
    component.registerForm.get('email')?.setValue('test@test.com');
    component.registerForm.get('password')?.setValue('123456');
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should call console.log on valid form submit', () => {
    vi.spyOn(console, 'log');
    
    component.registerForm.setValue({ name: 'Test User', email: 'test@test.com', password: '123456' });
    component.onSubmit();
    
    expect(console.log).toHaveBeenCalledWith('Register data', { name: 'Test User', email: 'test@test.com', password: '123456' });
  });
});
