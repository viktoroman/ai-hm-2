import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDetailsComponent } from './user-details.component';
import { User } from '../../contracts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let dialogRefMock: { close: jest.Mock };
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 4B',
      city: 'New York',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' }
    },
    phone: '555-1234',
    website: 'johndoe.com',
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovative solutions',
      bs: 'synergize scalable supply-chains'
    }
  };

  beforeEach(async () => {
    dialogRefMock = { close: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: mockUser }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive user data via injection', () => {
    expect(component.user).toEqual(mockUser);
  });

  it('should generate correct map URL', () => {
    expect(component.mapUrl).toBe('https://www.google.com/maps/search/?api=1&query=40.7128,-74.0060');
  });

  it('should generate correct website link', () => {
    expect(component.websiteLink).toBe('<a href=\'http://johndoe.com\' target=\'_blank\' rel=\'noopener\'>johndoe.com</a>');
  });

  it('should generate correct address value', () => {
    expect(component.addressValue).toBe('123 Main St, Apt 4B,<br>New York, 10001');
  });

  it('should generate correct company value', () => {
    expect(component.companyValue).toBe('Tech Corp<br><span class=\'user-details-company-catchphrase\'>Innovative solutions</span><br>synergize scalable supply-chains');
  });

  it('should generate correct map link', () => {
    expect(component.mapLink).toBe('<a href=\'https://www.google.com/maps/search/?api=1&query=40.7128,-74.0060\' target=\'_blank\' rel=\'noopener\'>View on Google Maps</a>');
  });
});
