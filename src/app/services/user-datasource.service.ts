import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../contracts';

@Injectable({
  providedIn: 'root'
})
export class UserDatasourceService {
  private readonly userService = inject(UserService);

  // Private BehaviorSubject for internal data management
  private readonly _data$ = new BehaviorSubject<User[]>([]);

  // Public Observable for components to subscribe to
  public readonly data$ = this._data$.asObservable();

  // Track deleted user IDs to filter them out
  private readonly deletedIds = new Set<number>();

  /**
   * Load users from the API and update the data stream
   */
  load(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        // Filter out deleted users before updating the stream
        const filteredUsers = users.filter(user => !this.deletedIds.has(user.id));
        this._data$.next(filteredUsers);
      },
      error: (error) => {
        console.error('Error loading users in datasource:', error);
        this._data$.next([]);
      }
    });
  }

  /**
   * Delete a user from the frontend (client-side only)
   * @param id - User ID to delete
   */
  deleteUser(id: number): void {
    // Add to deleted IDs set
    this.deletedIds.add(id);

    // Update current data by filtering out the deleted user
    const currentUsers = this._data$.value;
    const filteredUsers = currentUsers.filter(user => user.id !== id);
    this._data$.next(filteredUsers);
  }

  /**
   * Get current users count
   * @returns Observable<number> - Current number of users
   */
  get usersCount$(): Observable<number> {
    return this.data$.pipe(
      map(users => users.length)
    );
  }

  /**
   * Check if a user is deleted
   * @param id - User ID to check
   * @returns boolean - True if user is deleted
   */
  isUserDeleted(id: number): boolean {
    return this.deletedIds.has(id);
  }

  /**
   * Get all deleted user IDs
   * @returns number[] - Array of deleted user IDs
   */
  getDeletedIds(): number[] {
    return Array.from(this.deletedIds);
  }
}
