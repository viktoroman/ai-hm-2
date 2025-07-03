import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';
import { UserDatasourceService } from '../../services/user-datasource.service';
import { User } from '../../contracts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userDatasourceMock: jest.Mocked<UserDatasourceService>;
  let dialogMock: jest.Mocked<MatDialog>;

  const mockUsers: User[] = [
    { id: 1, name: 'Alice', username: 'alice', email: 'alice@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } },
    { id: 2, name: 'Bob', username: 'bob', email: 'bob@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }
  ];

  beforeEach(async () => {
    userDatasourceMock = {
      data$: of(mockUsers),
      load: jest.fn(),
      deleteUser: jest.fn()
    } as unknown as jest.Mocked<UserDatasourceService>;

    dialogMock = {
      open: jest.fn()
    } as unknown as jest.Mocked<MatDialog>;

    await TestBed.configureTestingModule({
      imports: [UsersComponent, NoopAnimationsModule],
      providers: [
        { provide: UserDatasourceService, useValue: userDatasourceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: HttpClient, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    expect(userDatasourceMock.load).toHaveBeenCalled();
  });

  it('should subscribe to datasource on init', () => {
    expect(component.$users()).toEqual(mockUsers);
  });
});
