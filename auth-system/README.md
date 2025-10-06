# 🚀 Sistema de Autenticación con Microfrontends

Solución completa de autenticación desacoplada usando arquitectura de microfrontends, backend NestJS, infraestructura Azure con Terraform y CI/CD automatizado.

## 📋 Entregables Completados

✅ **1. Diagrama de Arquitectura** → Ver `docs/architecture.md`  
✅ **2. Código Backend (NestJS)** → Ver `apps/backend/`  
✅ **3. Código Frontend (Angular + MF)** → Ver `apps/mf-login/` y `apps/host/`  
✅ **4. Pipeline CI/CD (GitHub Actions)** → Ver `.github/workflows/`  
✅ **5. Infraestructura (Terraform)** → Ver `infrastructure/terraform/`  
✅ **6. Documento de Decisiones Técnicas** → Ver `docs/technical-decisions.md`

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     Azure Cloud                         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │        Container App Environment                │   │
│  │                                                 │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  │   │
│  │  │   Host    │  │ MF Login  │  │  Backend  │  │   │
│  │  │ (Angular) │◄─┤ (Angular) │─►│ (NestJS)  │  │   │
│  │  └───────────┘  └───────────┘  └───────────┘  │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
auth-system/
├── apps/
│   ├── backend/              # API NestJS con JWT
│   ├── mf-login/             # Microfrontend de Login
│   └── host/                 # Aplicación Host Angular
├── infrastructure/
│   └── terraform/            # IaC para Azure
├── .github/
│   └── workflows/            # CI/CD Pipelines
├── docs/
│   ├── architecture.md       # Diagramas de arquitectura
│   └── technical-decisions.md # ADRs
└── package.json              # Monorepo workspace
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
# Software requerido
- Node.js >= 18.x
- npm >= 9.x
- Azure CLI (para deployment)
- Terraform >= 1.6.x (para IaC)
```

### Instalación Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp apps/backend/.env.example apps/backend/.env

# 3. Ejecutar todo en desarrollo
npm run dev:all
```

Acceder a:
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs
- **Host App**: http://localhost:4200
- **MF Login**: http://localhost:4201

---

## 🔧 Comandos Disponibles

### Desarrollo

```bash
# Ejecutar todo
npm run dev:all

# Backend individual
npm run backend:dev        # Puerto 3000

# Microfrontend Login
npm run mf-login:dev       # Puerto 4201

# Host Application
npm run host:dev           # Puerto 4200
```

### Build & Test

```bash
# Build todo
npm run build:all

# Tests
npm run test:all
```

---

## ☁️ Despliegue en Azure

### Con Terraform

```bash
cd infrastructure/terraform

# Configurar
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars

# Deploy
az login
terraform init
terraform plan
terraform apply
```

### Con CI/CD (GitHub Actions)

```bash
# Push a main ejecuta automáticamente:
git push origin main

# Workflows:
# - backend.yml → Deploy backend
# - frontend.yml → Deploy frontend  
# - terraform.yml → Provision infrastructure
```

---

## 📊 API Endpoints

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Login de usuario | No |
| POST | `/auth/register` | Registro de usuario | No |
| GET | `/auth/profile` | Obtener perfil | Sí |
| POST | `/auth/validate` | Validar token | No |

Ver documentación completa en: `http://localhost:3000/api/docs`

---

## 📖 Documentación

- **[Arquitectura del Sistema](docs/architecture.md)**: Diagramas completos
- **[Decisiones Técnicas](docs/technical-decisions.md)**: ADRs detallados
- **[Backend README](apps/backend/README.md)**: API documentation
- **[Terraform README](infrastructure/terraform/README.md)**: IaC guide

---

## 🔒 Seguridad

- ✅ JWT con expiración configurable
- ✅ Passwords hasheados con bcrypt
- ✅ CORS configurado
- ✅ HTTPS automático en Azure
- ✅ Secrets en variables de entorno

---

## 💰 Costos Estimados

| Recurso | Costo Mensual |
|---------|---------------|
| Container Apps | ~$30-50 |
| Log Analytics | ~$5-10 |
| Total | **~$40-65/mes** |

*Con free tier puede ser $0-20/mes*

---

## 🛠️ Stack Tecnológico

**Frontend**: Angular 17 | TypeScript | Module Federation | RxJS | SCSS  
**Backend**: NestJS 10 | TypeScript | Passport | JWT | Swagger  
**Infraestructura**: Azure | Container Apps | Terraform  
**CI/CD**: GitHub Actions | Docker

---

## 📝 Licencia

MIT License

---

**🎉 Proyecto completado - Todos los entregables listos**

**Autor**: Equipo de Desarrollo | **Fecha**: Octubre 2025
