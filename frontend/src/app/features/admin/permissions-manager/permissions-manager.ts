import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';
import { OptionService } from '../../../core/services/option.service';

@Component({
  selector: 'app-permissions-manager',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatIconModule, RouterLink],
  templateUrl: './permissions-manager.html',
  styleUrls: ['./permissions-manager.scss']
})
export class PermissionsManager implements OnInit {
  profiles: any[] = [];
  options: any[] = [];
  selectedProfileId: string = '';
  selectedProfile: any = null;
  isLoading = true;

  constructor(
    private profileService: ProfileService,
    private optionService: OptionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    let profilesLoaded = false;
    let optionsLoaded = false;

    this.profileService.getProfiles().subscribe(res => {
      this.profiles = res.data;
      profilesLoaded = true;
      if (optionsLoaded) this.finishLoading();
    });

    this.optionService.getOptions().subscribe(res => {
      this.options = res.data;
      optionsLoaded = true;
      if (profilesLoaded) this.finishLoading();
    });
  }

  finishLoading() {
    this.isLoading = false;
    if (this.profiles.length > 0) {
      this.onProfileSelect(this.profiles[0].id);
    }
    this.cdr.detectChanges();
  }

  onProfileSelect(id: string) {
    this.selectedProfileId = id;
    this.selectedProfile = this.profiles.find(p => p.id === id);
    this.cdr.detectChanges();
  }

  hasOption(optionId: string): boolean {
    if (!this.selectedProfile || !this.selectedProfile.profileOptions) return false;
    return this.selectedProfile.profileOptions.some((po: any) => po.optionId === optionId);
  }

  toggleOption(optionId: string, event: any) {
    if (!this.selectedProfile) return;
    
    let currentOptionIds = this.selectedProfile.profileOptions.map((po: any) => po.optionId);
    
    if (event.checked) {
      if (!currentOptionIds.includes(optionId)) {
        currentOptionIds.push(optionId);
      }
    } else {
      currentOptionIds = currentOptionIds.filter((id: string) => id !== optionId);
    }

    // Actualizar localmente
    this.selectedProfile.profileOptions = currentOptionIds.map((id: string) => ({ optionId: id }));
  }

  savePermissions() {
    if (!this.selectedProfile) return;
    
    const currentOptionIds = this.selectedProfile.profileOptions.map((po: any) => po.optionId);
    this.profileService.updateProfileOptions(this.selectedProfile.id, currentOptionIds).subscribe({
      next: () => {
        alert('Permisos guardados correctamente');
      },
      error: (err) => {
        console.error('Error al guardar permisos:', err);
        alert('Error al guardar los permisos');
      }
    });
  }
}
