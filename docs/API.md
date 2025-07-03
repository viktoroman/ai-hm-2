# API Documentation

This document describes the API interfaces, services, and data contracts used in the Angular User Management Application.

## Data Contracts

### User Interface

```typescript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
```

### Address Interface

```typescript
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
```

### Company Interface

```typescript
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
```

### Geo Interface

```typescript
interface Geo {
  lat: string;
  lng: string;
}
```

## Services

### UserService

Handles HTTP communication with the external API for user data.

#### Methods

##### `getUsers(): Observable<User[]>`
Fetches all users from the API.

**Returns**: Observable that emits an array of User objects

**Example**:
```typescript
this.userService.getUsers().subscribe({
  next: (users) => console.log('Users loaded:', users),
  error: (error) => console.error('Error loading users:', error)
});
```

### UserDatasourceService

Manages the application's user data state and provides reactive data streams.

#### Properties

##### `data$: Observable<User[]>`
Observable stream of user data. Emits the current list of users whenever it changes.

#### Methods

##### `load(): void`
Triggers loading of user data from the API. Updates the internal data stream.

**Example**:
```typescript
this.userDatasource.load();
```

##### `deleteUser(userId: number): void`
Removes a user from the local data store (client-side only).

**Parameters**:
- `userId: number` - The ID of the user to delete

**Example**:
```typescript
this.userDatasource.deleteUser(1);
```

## External API

The application uses the JSONPlaceholder API for user data:

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Users Endpoint**: `/users`
- **Method**: GET
- **Response**: Array of User objects

### API Response Format

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
]
```

## Error Handling

### HTTP Errors

The application handles various HTTP error scenarios:

- **Network Errors**: Connection failures, timeouts
- **Server Errors**: 4xx and 5xx status codes
- **Data Parsing Errors**: Invalid JSON responses

### Error Response Format

When errors occur, the application provides user-friendly error messages:

```typescript
interface ErrorResponse {
  message: string;
  status?: number;
  timestamp: Date;
}
```

## State Management

### Reactive Data Flow

1. **UserService** fetches data from external API
2. **UserDatasourceService** manages the data state
3. **Components** subscribe to data streams
4. **UI** updates reactively when data changes

### Data Lifecycle

```
API Request → UserService → UserDatasourceService → Components → UI
```

## Testing

### Service Testing

Services are tested with mocked HTTP responses:

```typescript
// Mock HTTP responses
const mockUsers: User[] = [...];

// Test service methods
it('should fetch users from API', () => {
  service.getUsers().subscribe(users => {
    expect(users).toEqual(mockUsers);
  });
});
```

### Error Testing

Error scenarios are thoroughly tested:

```typescript
it('should handle API errors gracefully', () => {
  // Mock error response
  // Test error handling
  // Verify user-friendly error messages
});
```

## Performance Considerations

### Caching Strategy

- User data is cached in the UserDatasourceService
- No redundant API calls for the same data
- Reactive updates when data changes

### Memory Management

- Proper subscription cleanup in components
- Use of `takeUntilDestroyed` for automatic unsubscription
- No memory leaks from long-lived observables

## Security

### Data Validation

- TypeScript interfaces ensure type safety
- Runtime validation of API responses
- Sanitization of user input

### Error Information

- No sensitive information in error messages
- Generic error messages for production
- Detailed logging for development

## Future Enhancements

### Planned API Features

- **Pagination**: Support for large datasets
- **Filtering**: Server-side filtering capabilities
- **Real-time Updates**: WebSocket integration
- **Offline Support**: Service worker caching

### API Versioning

- Versioned API endpoints
- Backward compatibility
- Migration strategies for breaking changes 
