# 🎯 GUÍA RÁPIDA - Ver la Aplicación Funcionando

## ✅ Estado Actual

- ✅ **Backend**: Funcionando perfectamente en http://localhost:3000
- ✅ **MF-Login**: Cargando correctamente en http://localhost:4201
- ⚠️ **Host**: Necesita que navegues a las rutas correctas

---

## 🌐 Cómo Ver la Aplicación

### Opción 1: Ver el Microfrontend Login Directamente
```
URL: http://localhost:4201
```
**Aquí verás**:
- Formulario de login completo
- Opción para cambiar entre Login y Registro
- Campos de email y contraseña
- Validaciones en tiempo real

---

### Opción 2: Ver desde la Aplicación Host

#### Paso 1: Acceder al Host
```
URL: http://localhost:4200
```
**Verás**: Página de bienvenida con información del proyecto

#### Paso 2: Ir al Login
Haz clic en el botón **"Ir al Login →"** o navega a:
```
URL: http://localhost:4200/login
```
**Verás**: El mismo formulario de login cargado dinámicamente vía Module Federation

---

## 🧪 Probar la Funcionalidad

### 1. Registro de Usuario

**En el formulario:**
1. Haz clic en "¿No tienes cuenta? Regístrate"
2. Completa los campos:
   - **Nombre**: Tu Nombre
   - **Email**: test@example.com
   - **Contraseña**: test123
3. Haz clic en "Registrarse"

**Backend procesará:**
```
POST http://localhost:3000/auth/register
```

**Respuesta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "generated-uuid",
    "name": "Tu Nombre",
    "email": "test@example.com"
  }
}
```

---

### 2. Login de Usuario

**En el formulario:**
1. Completa los campos:
   - **Email**: test@example.com
   - **Contraseña**: test123
2. Haz clic en "Iniciar Sesión"

**Backend procesará:**
```
POST http://localhost:3000/auth/login
```

**Respuesta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-del-usuario",
    "name": "Tu Nombre",
    "email": "test@example.com"
  }
}
```

---

### 3. Verificar en la Consola del Navegador

**Abre DevTools (F12) y verás:**

✅ **Console Tab:**
```
Token guardado: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Usuario: Tu Nombre
```

✅ **Network Tab:**
- Request a `http://localhost:3000/auth/login`
- Status: 200 OK
- Response con access_token

✅ **Application Tab → Local Storage:**
```
Key: auth_token
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔍 Ver el Swagger API

### Accede a la documentación interactiva:
```
URL: http://localhost:3000/api/docs
```

**Endpoints disponibles:**

1. **POST /auth/register**
   - Crear nuevo usuario
   - Requiere: name, email, password

2. **POST /auth/login**
   - Iniciar sesión
   - Requiere: email, password

3. **GET /auth/profile** 🔒
   - Obtener perfil del usuario autenticado
   - Requiere: Bearer Token

4. **POST /auth/validate**
   - Validar token JWT
   - Requiere: token en body

---

## 🎨 Qué Deberías Ver

### En http://localhost:4201 (MF-Login directamente):

```
┌──────────────────────────────────┐
│     🔐 Iniciar Sesión            │
│     Accede a tu cuenta           │
│                                  │
│  Email                           │
│  [usuario@ejemplo.com.........]  │
│                                  │
│  Contraseña                      │
│  [••••••••...................]   │
│                                  │
│  [ Iniciar Sesión ]              │
│                                  │
│  ¿No tienes cuenta? Regístrate   │
└──────────────────────────────────┘
```

### En http://localhost:4200 (Host - Home):

```
┌──────────────────────────────────────────┐
│  🔐 Sistema de Autenticación             │
│  Arquitectura de Microfrontends con      │
│  Module Federation                       │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Bienvenido a la App Host          │  │
│  │                                    │  │
│  │  [Features cards...]               │  │
│  │                                    │  │
│  │  [ Ir al Login → ]                 │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## 🚨 Si No Ves Nada

### Problema: Pantalla en blanco en localhost:4200

**Solución:**
1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Busca errores rojos
4. Recarga la página (Ctrl+R o F5)

### Problema: Error de Module Federation

**Solución:**
1. Verifica que ambos puertos estén activos:
   ```powershell
   netstat -ano | findstr :4200
   netstat -ano | findstr :4201
   ```
2. Recarga con Ctrl+Shift+R (hard reload)

### Problema: CORS Error

**Solución:**
El backend ya tiene CORS habilitado. Si ves el error:
1. Verifica que el backend esté corriendo en :3000
2. Revisa la consola del backend para ver los requests

---

## 📸 Screenshots Esperados

### 1. Página Home (localhost:4200)
- Header con título y subtítulo
- 4 cards con íconos (🚀🔒☁️⚙️)
- Botón azul "Ir al Login →"
- Tech badges al final

### 2. Página Login (localhost:4200/login)
- Fondo degradado morado
- Card blanco centrado
- Formulario con 2 campos (email, password)
- Botón "Iniciar Sesión"
- Link "¿No tienes cuenta? Regístrate"

### 3. Página Registro (localhost:4200/login → clic en registrarse)
- Mismo diseño del login
- 3 campos: Nombre, Email, Password
- Botón "Registrarse"
- Link "¿Ya tienes cuenta? Inicia Sesión"

---

## ✅ Checklist de Funcionamiento

Verifica estos puntos:

- [ ] Backend responde en http://localhost:3000
- [ ] Swagger docs accesibles en http://localhost:3000/api/docs
- [ ] MF-Login carga en http://localhost:4201
- [ ] Host carga en http://localhost:4200
- [ ] Botón "Ir al Login" funciona
- [ ] Formulario de login es visible
- [ ] Puedes cambiar entre Login y Registro
- [ ] DevTools Console no muestra errores críticos
- [ ] Network tab muestra requests a localhost:3000

---

## 🎯 Próximos Pasos

1. **Probar registro**: Crear un usuario nuevo
2. **Probar login**: Iniciar sesión con ese usuario
3. **Ver token**: Revisar Local Storage
4. **Probar API**: Usar Swagger para llamar /auth/profile

---

## 💡 Tips

- Usa **Ctrl+Shift+I** (o F12) para abrir DevTools
- En DevTools → **Network**, verás todas las peticiones HTTP
- En DevTools → **Console**, verás logs del AuthService
- En DevTools → **Application → Local Storage**, verás el token guardado

---

**¡Todo está funcionando! Solo necesitas navegar a las URLs correctas.** 🎉
