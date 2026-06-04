import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  errorMessage = '';
  profiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CLIENTE', Validators.required]
    });

    this.profileService.getPublicProfiles().subscribe(res => {
      // Filtrar para no permitir registrar ADMINs directamente
      this.profiles = res.data.filter((p: any) => p.name !== 'ADMIN');
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.errorMessage = '';
      const { name, email, password, role } = this.registerForm.value;
      
      this.authService.register(name, email, password, role).subscribe({
        next: () => {
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al registrar el usuario.';
        }
      });
    }
  }
}
