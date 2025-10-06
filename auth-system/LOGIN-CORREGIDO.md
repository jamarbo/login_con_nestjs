# 🔐 Login Corregido - Problema del Campo "name"

## ❌ Problema Detectado

Cuando intentabas hacer **login** después de registrarte, obtenías:

```
Error de login
HttpErrorResponse {status: 400, statusText: 'Bad Request'}
```

### 🔍 Causa del Error

El formulario de login estaba enviando **todos los campos** al backend, incluyendo el campo `name` vacío:

```typescript
// ❌ ANTES (Incorrecto)
{
  name: "",          // ❌ Campo vacío que no debe ir en login
  email: "admin@demo.com",
  password: "********"
}
```

El backend esperaba **solo** `email` y `password` para login:

```typescript
// ✅ LO QUE ESPERA EL BACKEND
{
  email: "admin@demo.com",
  password: "admin123"
}
```

---

## ✅ Solución Implementada

Modifiqué el método `onSubmit()` para enviar **solo los campos necesarios** según el modo:

### Modo Login (Solo email + password)
```typescript
{
  email: formValue.email,
  password: formValue.password
}
```

### Modo Registro (name + email + password)
```typescript
{
  name: formValue.name,
  email: formValue.email,
  password: formValue.password
}
```

---

## 🚀 Prueba Ahora

### 1. Refresca la Aplicación
Presiona **Ctrl + Shift + R** en http://localhost:4201

### 2. Registra un Nuevo Usuario
1. Haz clic en **"Regístrate"**
2. Completa:
   - **Nombre**: Test User
   - **Email**: test@example.com
   - **Password**: test123
3. Haz clic en **REGISTRAR**

**Resultado esperado:**
```
✅ Login exitoso!
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Usuario: {id: "...", email: "test@example.com", name: "Test User"}
```

### 3. Inicia Sesión
1. Cambia a modo **"Inicia"** (si no se redirigió automáticamente)
2. Ingresa:
   - **Email**: test@example.com
   - **Password**: test123
3. Haz clic en **INICIAR SESIÓN**

**Resultado esperado:**
```
✅ Login exitoso!
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Usuario: {id: "...", email: "test@example.com", name: "Test User"}
```

---

## 🎯 Usuarios de Prueba Disponibles

El backend tiene un usuario demo predefinido:

### Usuario Demo
```
Email: admin@example.com
Password: admin123
```

Puedes usarlo para probar directamente sin registrarte.

---

## 📊 Verificación en Consola

Presiona **F12** → Console

Después de un login exitoso verás:

```javascript
✅ Login exitoso! 
{
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjk2NTI1MDAwLCJleHAiOjE2OTY2MTE0MDB9.xyz123",
  user: {
    id: "1",
    email: "test@example.com",
    name: "Test User"
  }
}

Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Usuario: {id: "1", email: "test@example.com", name: "Test User"}
```

---

## 🔍 Verificar en Network Tab

**F12** → **Network** → Filtra por "login"

### Petición Exitosa
```
POST http://localhost:3000/auth/login
Status: 201 Created
Response:
{
  "access_token": "eyJhbGci...",
  "user": {
    "id": "1",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

---

## 🧪 Probar con Swagger

Alternativamente, puedes probar el backend directamente:

### 1. Abre Swagger
```
http://localhost:3000/api/docs
```

### 2. Prueba Login
1. Expande `POST /auth/login`
2. Haz clic en **"Try it out"**
3. Ingresa:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
4. Haz clic en **"Execute"**

**Resultado esperado**: Status 201 con token JWT

### 3. Prueba Registro
1. Expande `POST /auth/register`
2. Haz clic en **"Try it out"**
3. Ingresa:
```json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "nuevo123"
}
```
4. Haz clic en **"Execute"**

---

## ✅ Checklist de Verificación

- [ ] Registro funciona (status 201)
- [ ] Login funciona (status 201)
- [ ] Token JWT visible en consola
- [ ] Token guardado en localStorage
- [ ] Usuario demo funciona (admin@example.com / admin123)
- [ ] Sin errores 400 en Network tab

**Si todos ✅ → ¡Login funcionando perfectamente!** 🎉

---

## 💾 Token en localStorage

El token se guarda automáticamente. Verifica:

**F12** → **Application** → **Local Storage** → **http://localhost:4201**

Deberías ver:
```
Key: auth_token
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎨 Mejoras Visuales Agregadas

En la consola ahora verás mensajes más claros:

- ✅ **Login exitoso** → En verde
- ❌ **Error de login** → En rojo
- 🔑 **Token** → Resaltado
- 👤 **Usuario** → Info completa

---

## 🐛 Si Aún Tienes Problemas

### Problema: Error 400
**Causa**: Credenciales incorrectas

**Solución**: 
- Verifica que el email sea correcto
- La contraseña debe tener al menos 6 caracteres
- Usa el usuario demo: admin@example.com / admin123

### Problema: Error 404
**Causa**: Backend no está corriendo

**Solución**:
```powershell
cd C:\Users\jamar\Downloads\Affi_net\auth-system\apps\backend
npm run start:dev
```

### Problema: CORS Error
**Causa**: Backend no acepta peticiones desde localhost:4201

**Solución**: Verificar `.env` del backend:
```
CORS_ORIGINS=http://localhost:4200,http://localhost:4201
```

---

## 📝 Resumen del Cambio

**Archivo modificado**: `apps/mf-login/src/app/login/login.component.ts`

**Cambio realizado**:
```typescript
// ANTES: Enviaba todos los campos siempre
const request$ = this.isRegisterMode
  ? this.authService.register(formValue)
  : this.authService.login(formValue);

// AHORA: Envía solo los campos necesarios según el modo
const requestData = this.isRegisterMode
  ? { name: formValue.name, email: formValue.email, password: formValue.password }
  : { email: formValue.email, password: formValue.password };
```

---

**¡Ahora el login debería funcionar perfectamente!** 🚀

**Última actualización**: 5 de octubre de 2025 - 15:40
