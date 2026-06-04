import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsManager } from './permissions-manager';

describe('PermissionsManager', () => {
  let component: PermissionsManager;
  let fixture: ComponentFixture<PermissionsManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsManager],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
