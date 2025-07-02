import { ChangeDetectionStrategy, Component, EventEmitter, Output, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../contracts';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent {
  $users = input<User[]>([], { alias: 'users' });
  $deleteUser = output<number>({ alias: 'deleteUser' });

  displayedColumns = ['name', 'address', 'phone', 'website', 'company', 'action'];

  onDelete(id: number): void {
    this.$deleteUser.emit(id);
  }
}
