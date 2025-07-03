import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { UserDatasourceService } from './user-datasource.service';
import { UserService } from './user.service';
import { User } from '../contracts';

describe('UserDatasourceService', () => {
  let service: UserDatasourceService;
  let userServiceMock: jest.Mocked<UserService>;

  const mockUsers: User[] = [
    { id: 1, name: 'Alice', username: 'alice', email: 'alice@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } },
    { id: 2, name: 'Bob', username: 'bob', email: 'bob@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }
  ];

  beforeEach(() => {
    userServiceMock = {
      getUsers: jest.fn()
    } as unknown as jest.Mocked<UserService>;

    TestBed.configureTestingModule({
      providers: [
        UserDatasourceService,
        { provide: UserService, useValue: userServiceMock }
      ]
    });
    service = TestBed.inject(UserDatasourceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('should load users and update data$', (done) => {
      userServiceMock.getUsers.mockReturnValue(of(mockUsers));
      service.data$.subscribe(users => {
        if (users.length) {
          expect(users).toEqual(mockUsers);
          done();
        }
      });
      service.load();
    });

    it('should filter out deleted users on load', (done) => {
      userServiceMock.getUsers.mockReturnValue(of(mockUsers));
      service.deleteUser(1);
      service.data$.subscribe(users => {
        if (users.length === 1) {
          expect(users[0].id).toBe(2);
          done();
        }
      });
      service.load();
    });

    it('should set data$ to [] on error', (done) => {
      userServiceMock.getUsers.mockReturnValue(throwError(() => new Error('fail')));
      let emissionCount = 0;
      service.data$.subscribe(users => {
        emissionCount++;
        if (emissionCount === 2) { // skip initial emission
          expect(users).toEqual([]);
          done();
        }
      });
      service.load();
    });
  });

  describe('deleteUser', () => {
    it('should remove user from data$', (done) => {
      userServiceMock.getUsers.mockReturnValue(of(mockUsers));
      service.load();
      service.data$.subscribe(users => {
        if (users.length === 2) {
          service.deleteUser(1);
        }
        if (users.length === 1) {
          expect(users[0].id).toBe(2);
          done();
        }
      });
    });
  });

  describe('usersCount$', () => {
    it('should emit the correct user count', (done) => {
      userServiceMock.getUsers.mockReturnValue(of(mockUsers));
      service.load();
      service.usersCount$.subscribe(count => {
        if (count === 2) {
          service.deleteUser(1);
        }
        if (count === 1) {
          expect(count).toBe(1);
          done();
        }
      });
    });
  });

  describe('isUserDeleted', () => {
    it('should return true if user is deleted', () => {
      service.deleteUser(1);
      expect(service.isUserDeleted(1)).toBe(true);
    });
    it('should return false if user is not deleted', () => {
      expect(service.isUserDeleted(2)).toBe(false);
    });
  });

  describe('getDeletedIds', () => {
    it('should return all deleted user IDs', () => {
      service.deleteUser(1);
      service.deleteUser(2);
      expect(service.getDeletedIds().sort()).toEqual([1, 2]);
    });
  });
});
