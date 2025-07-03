# Deployment Documentation

This document provides comprehensive information about building and deploying the Angular User Management Application.

## Build Process

### Prerequisites

Before building the application, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 20 or higher)
- **Git** (for version control)

### Development Build

For development and testing purposes:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The development server will be available at `http://localhost:4200/`

### Production Build

For production deployment:

```bash
# Build for production
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Build Configuration

The build process is configured in `angular.json`:

```json
{
  "projects": {
    "ai-hw-2": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/ai-hw-2",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          }
        }
      }
    }
  }
}
```

## Deployment Options

### 1. Static Hosting (Recommended)

#### Netlify

1. **Connect Repository**
   ```bash
   # Build the project
   npm run build
   
   # Deploy to Netlify
   netlify deploy --dir=dist/ai-hw-2 --prod
   ```

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist/ai-hw-2`
   - Node version: `18`

#### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   # Build the project
   npm run build
   
   # Deploy to Vercel
   vercel --prod
   ```

#### GitHub Pages

1. **Add Angular CLI GitHub Pages**
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. **Build and Deploy**
   ```bash
   # Build for production
   npm run build --prod
   
   # Deploy to GitHub Pages
   ngh --dir=dist/ai-hw-2
   ```

### 2. Cloud Platforms

#### AWS S3 + CloudFront

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-app-bucket
   ```

2. **Upload Build Files**
   ```bash
   aws s3 sync dist/ai-hw-2 s3://your-app-bucket --delete
   ```

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Set S3 bucket as origin
   - Configure custom error pages for SPA routing

#### Google Cloud Platform

1. **Install Google Cloud CLI**
   ```bash
   gcloud auth login
   gcloud config set project your-project-id
   ```

2. **Deploy to App Engine**
   ```yaml
   # app.yaml
   runtime: nodejs18
   handlers:
   - url: /
     static_files: dist/ai-hw-2/index.html
     upload: dist/ai-hw-2/index.html
   
   - url: /(.*)
     static_files: dist/ai-hw-2/\1
     upload: dist/ai-hw-2/(.*)
   ```

3. **Deploy**
   ```bash
   gcloud app deploy
   ```

### 3. Container Deployment

#### Docker

1. **Create Dockerfile**
   ```dockerfile
   # Multi-stage build
   FROM node:18-alpine AS builder
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=builder /app/dist/ai-hw-2 /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Nginx Configuration**
   ```nginx
   # nginx.conf
   server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **Build and Run**
   ```bash
   # Build Docker image
   docker build -t angular-user-app .
   
   # Run container
   docker run -p 80:80 angular-user-app
   ```

#### Kubernetes

1. **Create Deployment**
   ```yaml
   # deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: angular-user-app
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: angular-user-app
     template:
       metadata:
         labels:
           app: angular-user-app
       spec:
         containers:
         - name: angular-user-app
           image: angular-user-app:latest
           ports:
           - containerPort: 80
   ```

2. **Create Service**
   ```yaml
   # service.yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: angular-user-app-service
   spec:
     selector:
       app: angular-user-app
     ports:
     - protocol: TCP
       port: 80
       targetPort: 80
     type: LoadBalancer
   ```

3. **Deploy**
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

## Environment Configuration

### Environment Files

Create environment-specific configuration files:

```typescript
// src/environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'https://jsonplaceholder.typicode.com',
  version: '1.0.0'
};

// src/environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com',
  version: '1.0.0'
};
```

### Build Scripts

Add environment-specific build scripts to `package.json`:

```json
{
  "scripts": {
    "build:dev": "ng build --configuration=development",
    "build:prod": "ng build --configuration=production",
    "build:staging": "ng build --configuration=staging"
  }
}
```

## Performance Optimization

### Build Optimization

1. **Enable Production Mode**
   ```bash
   npm run build --prod
   ```

2. **Bundle Analysis**
   ```bash
   npm install -g webpack-bundle-analyzer
   ng build --stats-json
   webpack-bundle-analyzer dist/ai-hw-2/stats.json
   ```

3. **Lazy Loading**
   ```typescript
   // app.routes.ts
   const routes: Routes = [
     {
       path: 'users',
       loadComponent: () => import('./pages/users/users.component')
         .then(m => m.UsersComponent)
     }
   ];
   ```

### Caching Strategy

1. **Service Worker**
   ```bash
   ng add @angular/pwa
   ```

2. **Cache Headers**
   ```nginx
   # Static assets
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   
   # HTML files
   location ~* \.html$ {
       expires -1;
       add_header Cache-Control "no-cache, no-store, must-revalidate";
   }
   ```

## Security Considerations

### Content Security Policy

Add CSP headers to your server configuration:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https://jsonplaceholder.typicode.com;";
```

### HTTPS

Always use HTTPS in production:

```bash
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## Monitoring and Analytics

### Error Tracking

1. **Sentry Integration**
   ```bash
   npm install @sentry/angular
   ```

2. **Configure Sentry**
   ```typescript
   // main.ts
   import * as Sentry from "@sentry/angular";
   
   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: environment.production ? 'production' : 'development'
   });
   ```

### Performance Monitoring

1. **Google Analytics**
   ```typescript
   // Add to index.html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Web Vitals**
   ```bash
   npm install web-vitals
   ```

## Continuous Deployment

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build for production
      run: npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist/ai-hw-2'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/ai-hw-2/

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST -H "Content-Type: application/json" -d '{"ref":"main"}' https://api.github.com/repos/owner/repo/dispatches
  only:
    - main
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Routing Issues**
   - Ensure server is configured for SPA routing
   - Check that all routes redirect to `index.html`

3. **Performance Issues**
   - Enable gzip compression
   - Optimize images
   - Use CDN for static assets

### Debug Commands

```bash
# Check bundle size
npm run build --prod --stats-json
npx webpack-bundle-analyzer dist/ai-hw-2/stats.json

# Check for unused dependencies
npx depcheck

# Audit dependencies
npm audit
npm audit fix
```

## Best Practices

1. **Always test in staging environment**
2. **Use semantic versioning**
3. **Implement proper error handling**
4. **Monitor application performance**
5. **Keep dependencies updated**
6. **Use HTTPS in production**
7. **Implement proper caching strategies**
8. **Set up automated testing in CI/CD**
9. **Monitor error rates and performance**
10. **Document deployment procedures**

## Resources

- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Nginx Configuration](https://nginx.org/en/docs/) 
