import { ChangeDetectionStrategy, Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDatasourceService } from './services/user-datasource.service';
import { User } from './contracts';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    private readonly userDatasource = inject(UserDatasourceService);
    private readonly destroyRef = inject(DestroyRef);

    $users = signal<User[]>([]);
    $isLoading = signal(false);
    $error = signal<string | null>(null);

    ngOnInit(): void {
        this.subscribeToData();
        this.loadData();
    }

    /**
     * Subscribe to data changes from the datasource
     */
    private subscribeToData(): void {
        this.userDatasource.data$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (users) => {
                    this.$users.set(users);
                    this.$isLoading.set(false);
                    console.log('Users loaded from datasource:', users.length);
                },
                error: (error) => {
                    this.$error.set('Failed to load users');
                    this.$isLoading.set(false);
                    console.error('Error loading users from datasource:', error);
                }
            });
    }

    /**
     * Trigger data loading from the datasource
     */
    private loadData(): void {
        this.$isLoading.set(true);
        this.$error.set(null);
        this.userDatasource.load();
    }

    /**
     * Delete a user (client-side only)
     * @param userId - ID of the user to delete
     */
    deleteUser(userId: number): void {
        this.userDatasource.deleteUser(userId);
        console.log(`User ${userId} deleted from frontend`);
    }
}
