import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../contracts';

describe('UserService', () => {
  let service: UserService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
      // ... add other HttpClient methods if needed
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with the correct URL when getUsers is called', () => {
    httpClientMock.get.mockReturnValue(of([]));
    service.getUsers().subscribe();
    expect(httpClientMock.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('should return an observable of users when getUsers is called', (done) => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }
    ];
    httpClientMock.get.mockReturnValue(of(mockUsers));
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      done();
    });
  });

  it('should propagate errors from HttpClient.get', (done) => {
    const error = new Error('Network error');
    httpClientMock.get.mockReturnValue(throwError(() => error));
    service.getUsers().subscribe({
      next: () => {
        // Should not be called
        fail('Expected error, but got success');
      },
      error: (err) => {
        expect(err).toBe(error);
        done();
      }
    });
  });
});
