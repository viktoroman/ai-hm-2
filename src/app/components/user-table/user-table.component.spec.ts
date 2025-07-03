import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserTableComponent } from './user-table.component';
import { User } from '../../contracts';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  const mockUsers: User[] = [
    {
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
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      address: {
        street: '456 Oak Ave',
        suite: 'Suite 2',
        city: 'Los Angeles',
        zipcode: '90210',
        geo: { lat: '34.0522', lng: '-118.2437' }
      },
      phone: '555-5678',
      website: 'janesmith.com',
      company: {
        name: 'Design Studio',
        catchPhrase: 'Creative excellence',
        bs: 'revolutionize end-to-end systems'
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct displayed columns', () => {
    expect(component.displayedColumns).toEqual(['name', 'address', 'phone', 'website', 'company', 'action']);
  });

  it('should have default empty users array', () => {
    expect(component.$users()).toEqual([]);
  });

  it('should emit deleteUser event when onDelete is called', () => {
    const deleteSpy = jest.fn();
    component.$deleteUser.subscribe(deleteSpy);

    component.onDelete(1);

    expect(deleteSpy).toHaveBeenCalledWith(1);
  });

  it('should render table headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('NAME / EMAIL');
    expect(compiled.textContent).toContain('ADDRESS');
    expect(compiled.textContent).toContain('PHONE');
    expect(compiled.textContent).toContain('WEBSITE');
    expect(compiled.textContent).toContain('COMPANY');
    expect(compiled.textContent).toContain('ACTION');
  });

  it('should have output signals defined', () => {
    expect(component.$deleteUser).toBeDefined();
    expect(component.$rowClick).toBeDefined();
  });

  it('should render table structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector('table');
    expect(table).toBeTruthy();
    expect(table?.classList.contains('user-table')).toBe(true);
  });
});
