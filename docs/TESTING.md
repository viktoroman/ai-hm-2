# Testing Documentation

This document provides comprehensive information about the testing strategy, best practices, and guidelines for the Angular User Management Application.

## Testing Overview

The application uses **Jest** as the testing framework with **92.85% test coverage**, exceeding the minimum requirement of 70%.

### Test Coverage Summary

| Component/Service | Coverage | Status |
|------------------|----------|--------|
| AppComponent | 100% | ✅ |
| ConfirmDialogComponent | 100% | ✅ |
| UserDetailsComponent | 100% | ✅ |
| UserTableComponent | 100% | ✅ |
| HomeComponent | 100% | ✅ |
| UsersComponent | 74.28% | ✅ |
| UserService | 100% | ✅ |
| UserDatasourceService | 100% | ✅ |
| **Overall** | **92.85%** | ✅ |

## Testing Framework Setup

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  moduleNameMapping: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
```

### Setup File

```typescript
// setup-jest.ts
import 'jest-preset-angular/setup-jest';
```

## Running Tests

### Available Commands

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with verbose output
npm run test:verbose

# Run specific test file
npm test -- --testPathPattern=user.service.spec.ts

# Run tests matching pattern
npm test -- --testNamePattern="should create"
```

### Coverage Reports

After running `npm run test:coverage`, you'll get:

1. **Console Report**: Shows coverage summary in terminal
2. **HTML Report**: Detailed coverage report in `coverage/` directory
3. **Coverage Thresholds**: Ensures minimum 70% coverage

## Testing Best Practices

### 1. Test Structure (AAA Pattern)

```typescript
describe('ComponentName', () => {
  // Arrange
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(() => {
    // Setup test environment
  });

  it('should do something', () => {
    // Arrange - Prepare test data
    const testData = { id: 1, name: 'Test' };

    // Act - Execute the action
    component.doSomething(testData);

    // Assert - Verify the result
    expect(component.result).toBe(expectedValue);
  });
});
```

### 2. Descriptive Test Names

```typescript
// ✅ Good
it('should display user name in the table', () => {});
it('should call deleteUser when delete button is clicked', () => {});
it('should handle API errors gracefully', () => {});

// ❌ Bad
it('should work', () => {});
it('test 1', () => {});
it('does something', () => {});
```

### 3. Test Isolation

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no unexpected requests
  });
});
```

### 4. Mocking Dependencies

```typescript
// Mock service
const mockUserService = {
  getUsers: jest.fn().mockReturnValue(of(mockUsers)),
  deleteUser: jest.fn()
} as unknown as jest.Mocked<UserService>;

// Mock dialog
const mockDialog = {
  open: jest.fn().mockReturnValue({
    afterClosed: jest.fn().mockReturnValue(of(true))
  })
} as unknown as jest.Mocked<MatDialog>;
```

## Component Testing

### Basic Component Test

```typescript
describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableComponent],
      providers: [
        { provide: UserDatasourceService, useValue: mockUserDatasource }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users in table', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBeGreaterThan(1);
  });
});
```

### Testing Input/Output Properties

```typescript
describe('UserTableComponent', () => {
  it('should receive users input', () => {
    const testUsers: User[] = [mockUser];
    component.$users.set(testUsers);
    fixture.detectChanges();
    
    expect(component.$users()).toEqual(testUsers);
  });

  it('should emit delete event', () => {
    const deleteSpy = jest.fn();
    component.deleteUser.subscribe(deleteSpy);
    
    component.onDeleteUser(1);
    
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
```

### Testing Template Rendering

```typescript
it('should render user name in table', () => {
  const testUser: User = { id: 1, name: 'John Doe', ... };
  component.$users.set([testUser]);
  fixture.detectChanges();
  
  const nameCell = fixture.nativeElement.querySelector('.user-name');
  expect(nameCell.textContent).toContain('John Doe');
});
```

## Service Testing

### HTTP Service Testing

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users from API', () => {
    const mockUsers: User[] = [mockUser];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle API errors', () => {
    service.getUsers().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
```

### State Management Service Testing

```typescript
describe('UserDatasourceService', () => {
  let service: UserDatasourceService;
  let userServiceMock: jest.Mocked<UserService>;

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

  it('should load users and update data stream', (done) => {
    const mockUsers: User[] = [mockUser];
    userServiceMock.getUsers.mockReturnValue(of(mockUsers));
    
    service.data$.subscribe(users => {
      expect(users).toEqual(mockUsers);
      done();
    });
    
    service.load();
  });

  it('should handle loading errors', (done) => {
    userServiceMock.getUsers.mockReturnValue(throwError(() => new Error('API Error')));
    
    service.data$.subscribe(users => {
      expect(users).toEqual([]);
      done();
    });
    
    service.load();
  });
});
```

## Error Testing

### Testing Error Scenarios

```typescript
it('should handle network errors', () => {
  userServiceMock.getUsers.mockReturnValue(
    throwError(() => new Error('Network Error'))
  );
  
  service.load();
  
  expect(service.$error()).toBe('Failed to load users');
  expect(service.$isLoading()).toBe(false);
});

it('should handle empty responses', () => {
  userServiceMock.getUsers.mockReturnValue(of([]));
  
  service.load();
  
  expect(service.$users()).toEqual([]);
});
```

## Integration Testing

### Component-Service Integration

```typescript
describe('UsersComponent Integration', () => {
  let component: UsersComponent;
  let userDatasourceMock: jest.Mocked<UserDatasourceService>;

  beforeEach(async () => {
    userDatasourceMock = {
      data$: of(mockUsers),
      load: jest.fn(),
      deleteUser: jest.fn()
    } as unknown as jest.Mocked<UserDatasourceService>;

    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        { provide: UserDatasourceService, useValue: userDatasourceMock }
      ]
    }).compileComponents();

    component = TestBed.createComponent(UsersComponent).componentInstance;
  });

  it('should load data on initialization', () => {
    component.ngOnInit();
    expect(userDatasourceMock.load).toHaveBeenCalled();
  });

  it('should subscribe to data changes', () => {
    component.ngOnInit();
    expect(component.$users()).toEqual(mockUsers);
  });
});
```

## Performance Testing

### Memory Leak Testing

```typescript
it('should not create memory leaks', () => {
  const initialMemory = performance.memory?.usedJSHeapSize || 0;
  
  // Create and destroy component multiple times
  for (let i = 0; i < 100; i++) {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.destroy();
  }
  
  const finalMemory = performance.memory?.usedJSHeapSize || 0;
  const memoryIncrease = finalMemory - initialMemory;
  
  // Memory increase should be minimal
  expect(memoryIncrease).toBeLessThan(1000000); // 1MB
});
```

## Testing Utilities

### Test Data Factories

```typescript
// test-utils/user.factory.ts
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 1',
    city: 'New York',
    zipcode: '10001',
    geo: { lat: '40.7128', lng: '-74.0060' }
  },
  phone: '123-456-7890',
  website: 'johndoe.com',
  company: {
    name: 'Test Company',
    catchPhrase: 'Test phrase',
    bs: 'Test bs'
  },
  ...overrides
});
```

### Custom Matchers

```typescript
// test-utils/custom-matchers.ts
expect.extend({
  toBeValidUser(received: any) {
    const pass = received && 
                 typeof received.id === 'number' &&
                 typeof received.name === 'string' &&
                 typeof received.email === 'string';
    
    return {
      pass,
      message: () => `expected ${received} to be a valid User object`
    };
  }
});
```

## Continuous Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    - run: npm run test:coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

## Troubleshooting

### Common Issues

1. **Test Environment Issues**
   ```bash
   # Clear Jest cache
   npm test -- --clearCache
   ```

2. **Coverage Issues**
   ```bash
   # Regenerate coverage
   npm run test:coverage -- --coverageReporters=text
   ```

3. **Mock Issues**
   ```typescript
   // Reset all mocks
   beforeEach(() => {
     jest.clearAllMocks();
   });
   ```

### Debugging Tests

```typescript
// Add debugging to tests
it('should work correctly', () => {
  console.log('Component state:', component);
  console.log('Fixture element:', fixture.nativeElement.innerHTML);
  
  // Your test logic here
});
```

## Best Practices Summary

1. **Write tests first** (TDD approach)
2. **Test behavior, not implementation**
3. **Keep tests simple and focused**
4. **Use descriptive test names**
5. **Mock external dependencies**
6. **Test error scenarios**
7. **Maintain high coverage**
8. **Run tests frequently**
9. **Review test code regularly**
10. **Document complex test scenarios**

## Resources

- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Angular Applications](https://testing-angular.com/)
- [Angular Testing Best Practices](https://angular.io/guide/testing#testing-utility-apis) 
