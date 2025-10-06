# Backend - API de Autenticación

API REST desarrollada con NestJS para manejo de autenticación con JWT.

## 🚀 Tecnologías

- NestJS 10
- TypeScript
- JWT (JSON Web Tokens)
- Passport
- Bcrypt
- Swagger/OpenAPI

## 📦 Instalación

```bash
npm install
```

## 🏃 Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📚 Documentación API

Una vez ejecutado, acceder a: http://localhost:3000/api/docs

## 🔐 Endpoints

### POST /auth/login
Login de usuario existente

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### POST /auth/register
Registro de nuevo usuario

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### GET /auth/profile
Obtener perfil del usuario autenticado (requiere token)

**Headers:**
```
Authorization: Bearer <token>
```

### POST /auth/validate
Validar un token JWT

**Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🧪 Tests

```bash
npm run test
npm run test:cov
```

## 🏗️ Arquitectura

```
src/
├── auth/
│   ├── dto/              # Data Transfer Objects
│   ├── guards/           # Guards de autenticación
│   ├── interfaces/       # Interfaces TypeScript
│   ├── strategies/       # Estrategias de Passport
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── app.module.ts
└── main.ts
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- JWT con expiración configurable
- Validación de DTOs con class-validator
- CORS configurado para microfrontends
- Guards de autenticación con Passport

## 📝 Notas

- En producción, conectar a base de datos real (actualmente usa mock en memoria)
- Cambiar JWT_SECRET en variables de entorno
- Implementar refresh tokens para mayor seguridad
