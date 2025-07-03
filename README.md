# Angular User Management Application

A modern Angular application for managing user data with comprehensive unit testing and high code coverage.

## 🚀 Features

- **User Management**: Display, view details, and delete users
- **Modern Angular**: Built with Angular 20 and latest features
- **Material Design**: Beautiful UI using Angular Material
- **Comprehensive Testing**: 92.85% test coverage with Jest
- **Responsive Design**: Works on desktop and mobile devices
- **Type Safety**: Full TypeScript implementation

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 20 or higher)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-hw-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 🧪 Testing

This project includes comprehensive unit tests with Jest. All tests follow Angular testing best practices.

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with verbose output
npm run test:verbose
```

### Test Coverage

- **Overall Coverage**: 92.85%
- **AppComponent**: 100%
- **ConfirmDialogComponent**: 100%
- **UserDetailsComponent**: 100%
- **UserTableComponent**: 100%
- **HomeComponent**: 100%
- **UsersComponent**: 74.28%
- **UserService**: 100%
- **UserDatasourceService**: 100%

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── confirm-dialog/
│   │   │   ├── confirm-dialog.component.html
│   │   │   ├── confirm-dialog.component.scss
│   │   │   ├── confirm-dialog.component.spec.ts
│   │   │   └── confirm-dialog.component.ts
│   │   ├── user-details/
│   │   │   ├── user-details.component.html
│   │   │   ├── user-details.component.scss
│   │   │   ├── user-details.component.spec.ts
│   │   │   └── user-details.component.ts
│   │   └── user-table/
│   │       ├── user-table.component.html
│   │       ├── user-table.component.scss
│   │       ├── user-table.component.spec.ts
│   │       └── user-table.component.ts
│   ├── contracts/
│   │   ├── address.contract.ts
│   │   ├── company.contract.ts
│   │   ├── geo.contract.ts
│   │   ├── index.ts
│   │   └── user.contract.ts
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.component.html
│   │   │   ├── home.component.scss
│   │   │   ├── home.component.spec.ts
│   │   │   └── home.component.ts
│   │   └── users/
│   │       ├── users.component.html
│   │       ├── users.component.scss
│   │       ├── users.component.spec.ts
│   │       └── users.component.ts
│   ├── services/
│   │   ├── user-datasource.service.spec.ts
│   │   ├── user-datasource.service.ts
│   │   ├── user.service.spec.ts
│   │   └── user.service.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── styles/
│   └── styles.scss
├── favicon.ico
├── index.html
└── main.ts
```

## 🏗️ Architecture

### Components

- **AppComponent**: Main application component with navigation
- **HomeComponent**: Welcome page component
- **UsersComponent**: User management page
- **UserTableComponent**: Reusable table for displaying users
- **UserDetailsComponent**: Modal dialog for user details
- **ConfirmDialogComponent**: Reusable confirmation dialog

### Services

- **UserService**: Handles API communication for user data
- **UserDatasourceService**: Manages user data state and operations

### Contracts

TypeScript interfaces defining the data structures:
- **User**: Main user interface
- **Address**: User address information
- **Company**: User company information
- **Geo**: Geographical coordinates

## 🎨 UI/UX Features

- **Navigation**: Clean navigation between Home and Users pages
- **User Table**: Sortable and filterable user data table
- **User Details**: Modal dialog showing detailed user information
- **Delete Confirmation**: Confirmation dialog before user deletion
- **Responsive Design**: Adapts to different screen sizes
- **Loading States**: Visual feedback during data loading
- **Error Handling**: User-friendly error messages

## 🔧 Development

### Available Scripts

```bash
# Development
npm start          # Start development server
npm run build      # Build for production
npm run watch      # Build in watch mode

# Testing
npm test           # Run all tests
npm run test:coverage  # Run tests with coverage
npm run test:watch     # Run tests in watch mode
npm run test:verbose   # Run tests with verbose output
```

### Code Style

This project follows Angular style guide and best practices:
- **TypeScript**: Strict typing throughout
- **Angular Signals**: Modern reactive state management
- **Standalone Components**: No NgModules required
- **OnPush Change Detection**: Optimized performance
- **Dependency Injection**: Proper service injection

## 🧪 Testing Strategy

### Test Coverage Goals
- **Minimum Coverage**: 70%
- **Current Coverage**: 92.85%
- **Test Types**: Unit tests for all components and services

### Testing Best Practices
- **Isolation**: Each test is independent
- **Mocking**: External dependencies are mocked
- **Descriptive Names**: Clear test descriptions
- **Arrange-Act-Assert**: Consistent test structure
- **Error Scenarios**: Error handling is tested

### Test Files Structure
- **Component Tests**: Test component creation, rendering, and interactions
- **Service Tests**: Test service methods and error handling
- **Template Tests**: Verify correct HTML structure and content

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Configuration

The application uses Angular's environment system for configuration:
- **Development**: Uses development API endpoints
- **Production**: Uses production API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Maintain test coverage above 70%
- Follow Angular style guide
- Use TypeScript strict mode
- Document new components and services

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem
4. Provide environment details (OS, Node.js version, etc.)

## 🔄 Version History

- **v1.0.0**: Initial release with comprehensive testing
  - Complete user management functionality
  - 92.85% test coverage
  - Modern Angular 20 implementation
  - Material Design UI

---

**Built with ❤️ using Angular 20**
