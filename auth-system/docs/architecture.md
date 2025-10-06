# Diagrama de Arquitectura - Sistema de Autenticación

## Arquitectura General del Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USUARIO FINAL                              │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 │ HTTPS
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         AZURE CLOUD                                 │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │              Container App Environment                     │     │
│  │                                                            │     │
│  │  ┌──────────────────────┐       ┌──────────────────────┐   │     │
│  │  │   Host Application   │       │  Microfrontend Login │   │     │
│  │  │   (Angular + MF)     │◄──────┤     (Angular)        │   │     │
│  │  │   Port: 80           │       │   Port: 80           │   |     │
│  │  |          │           |       |                      |   │     │
│  │  |          │ REST API  |       |                      |   │     │
│  │  └──────────┬───────────┘       └──────────────────────┘   |     | 
│  │             │                                              │     │
│  │             ▼                                              │     │
│  │  ┌──────────────────────┐                                  │     │
│  │  │    Backend API       │                                  │     │
│  │  │    (NestJS)          │                                  │     │
│  │  │    Port: 3000        │                                  │     │
│  │  │                      │                                  │     │
│  │  │  - Auth Controller   │                                  │     │
│  │  │  - JWT Strategy      │                                  │     │
│  │  │  - Guards            │                                  │     │
│  │  └──────────────────────┘                                  │     │  
│  │                                                            │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │         Log Analytics Workspace                            │     │
│  │         - Application Insights                             │     │
│  │         - Monitoring & Alerts                              │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Flujo de Autenticación

```
┌──────────┐           ┌──────────────┐           ┌─────────────┐
│  Usuario │           │ MF Login     │           │  Backend    │
└────┬─────┘           └──────┬───────┘           └──────┬──────┘
     │                        │                          │
     │  1. Accede a /login    │                          │
     ├───────────────────────>│                          │
     │                        │                          │
     │  2. Renderiza Form     │                          │
     │<───────────────────────┤                          │
     │                        │                          │
     │  3. Submit (email/pwd) │                          │
     ├───────────────────────>│                          │
     │                        │  4. POST /auth/login     │
     │                        ├─────────────────────────>│
     │                        │                          │
     │                        │  5. Valida credenciales  │
     │                        │     Genera JWT           │
     │                        │                          │
     │                        │  6. { token, user }      │
     │                        │<─────────────────────────┤
     │                        │                          │
     │  7. Guarda token       │                          │
     │     localStorage       │                          │
     │                        │                          │
     │  8. Redirige a Home    │                          │
     │<───────────────────────┤                          │
     │                        │                          │
     │  9. Requests con       │                          │
     │     Bearer token       ├─────────────────────────>│
     │                        │  10. Valida JWT          │
     │                        │      (JwtStrategy)       │
     │                        │                          │
     │                        │  11. Response            │
     │<───────────────────────┼──────────────────────────┤
     │                        │                          │
```

## Arquitectura de Microfrontends

```
┌─────────────────────────────────────────────────────────────┐
│                     Host Application                        │
│                   http://localhost:4200                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Module Federation Config                  │   │
│  │                                                      │   │
│  │  remotes: {                                          │   │
│  │    mfLogin: 'http://localhost:4201/remoteEntry.js'   │   │
│  │  }                                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Router Configuration                    │   │
│  │                                                      │   │
│  │  /           → HomeComponent (local)                 │   │
│  │  /login      → LoginModule (remote)                  │   │
│  │  /dashboard  → DashboardModule (local)               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Dynamic Import
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Microfrontend Login (Remote)                   │
│                 http://localhost:4201                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Module Federation Config                  │   │
│  │                                                      │   │
│  │  name: 'mfLogin'                                     │   │
│  │  exposes: {                                          │   │
│  │    './LoginModule': './src/app/login/login.module'   │   │
│  │  }                                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              LoginModule                             │   │
│  │                                                      │   │
│  │  - LoginComponent                                    │   │
│  │  - AuthService                                       │   │
│  │  - Reactive Forms                                    │   │
│  │  - HTTP Client                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                       │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ Push/PR
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions                           │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │  Backend CI/CD   │  │  Frontend CI/CD  │                 │
│  ├──────────────────┤  ├──────────────────┤                 │
│  │ 1. Lint          │  │ 1. Lint          │                 │
│  │ 2. Test          │  │ 2. Build MF      │                 │
│  │ 3. Build         │  │ 3. Build Host    │                 │
│  │ 4. Docker Build  │  │ 4. Deploy        │                 │
│  │ 5. Push to GHCR  │  │                  │                 │
│  │ 6. Deploy Azure  │  │                  │                 │
│  └────────┬─────────┘  └────────┬─────────┘                 │
│           │                     │                           │
└───────────┼─────────────────────┼───────────────────────────┘
            │                     │
            ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │  Terraform       │  │  Azure           │                 │
│  ├──────────────────┤  │  Resources       │                 │
│  │ 1. Validate      │  ├──────────────────┤                 │
│  │ 2. Plan          │  │ - Resource Group │                 │
│  │ 3. Apply         │  │ - Container Apps │                 │
│  │                  │  │ - Networking     │                 │
│  └──────────────────┘  │ - Monitoring     │                 │
│                        └──────────────────┘                 │
│                      Azure Cloud                            │
└─────────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

### Frontend
- **Framework**: Angular 17
- **Module Federation**: @angular-architects/module-federation
- **Routing**: Angular Router
- **Forms**: Reactive Forms
- **HTTP**: HttpClient
- **Styling**: SCSS

### Backend
- **Framework**: NestJS 10
- **Language**: TypeScript
- **Authentication**: Passport + JWT
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

### Infrastructure
- **Cloud Provider**: Microsoft Azure
- **Compute**: Container Apps
- **Monitoring**: Log Analytics Workspace
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **Container Registry**: GitHub Container Registry

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Orchestration**: Azure Container Apps
- **Monitoring**: Application Insights

## Decisiones de Arquitectura

### ¿Por qué Microfrontends?
✅ Desacoplamiento del frontend
✅ Desarrollo independiente
✅ Despliegue independiente
✅ Escalabilidad del equipo
✅ Tecnologías heterogéneas

### ¿Por qué Container Apps?
✅ Serverless y escalable
✅ Integración con Azure
✅ Precio basado en uso
✅ HTTPS automático
✅ Monitoreo integrado

### ¿Por qué Monorepositorios?
✅ Código compartido fácil
✅ Refactoring global
✅ Versionado unificado
✅ CI/CD simplificado
✅ Developer experience

## Seguridad

- ✅ JWT para autenticación stateless
- ✅ HTTPS en todos los endpoints
- ✅ CORS configurado
- ✅ Secrets en Azure Key Vault
- ✅ Validación de DTOs
- ✅ Guards de autenticación
- ✅ Bcrypt para passwords

## Escalabilidad

- ✅ Autoescalado de Container Apps
- ✅ Microfrontends independientes
- ✅ API stateless
- ✅ Load balancing automático
- ✅ CDN para assets estáticos
