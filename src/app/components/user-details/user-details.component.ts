import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../contracts';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  get mapUrl(): string {
    const { lat, lng } = this.user.address.geo;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  get websiteLink(): string {
    return `<a href='http://${this.user.website}' target='_blank' rel='noopener'>${this.user.website}</a>`;
  }

  get addressValue(): string {
    return `${this.user.address.street}, ${this.user.address.suite},<br>${this.user.address.city}, ${this.user.address.zipcode}`;
  }

  get companyValue(): string {
    return `${this.user.company.name}<br><span class='user-details-company-catchphrase'>${this.user.company.catchPhrase}</span><br>${this.user.company.bs}`;
  }

  get mapLink(): string {
    const { lat, lng } = this.user.address.geo;
    return `<a href='https://www.google.com/maps/search/?api=1&query=${lat},${lng}' target='_blank' rel='noopener'>View on Google Maps</a>`;
  }
}
