import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { User } from './contracts';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    private readonly userService = inject(UserService);

    // Convert to signals for reactive state management with "$" prefix
    $users = signal<User[]>([]);
    $isLoading = signal(false);
    $error = signal<string | null>(null);

    ngOnInit(): void {
        this.loadUsers();
    }

    private loadUsers(): void {
        this.$isLoading.set(true);
        this.$error.set(null);

        this.userService.getUsers().subscribe({
            next: (users) => {
                this.$users.set(users);
                this.$isLoading.set(false);
                console.log('Users loaded:', users.length);
            },
            error: (error) => {
                this.$error.set('Failed to load users');
                this.$isLoading.set(false);
                console.error('Error loading users:', error);
            }
        });
    }
}
