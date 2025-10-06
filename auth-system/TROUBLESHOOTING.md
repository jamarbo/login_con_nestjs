# 🔧 Troubleshooting - Solución de Problemas

## 🎯 Resumen Rápido

**La mayoría de los errores se solucionan con:**
```bash
npm install
```

---

## ❗ Problemas Comunes

### 1. "No se encuentra el módulo..."

**Síntoma**: Errores como `Cannot find module '@nestjs/core'` o `Cannot find module '@angular/core'`

**Causa**: Dependencias no instaladas

**Solución**:
```bash
cd C:\Users\jamar\Downloads\Affi_net\auth-system
npm install
```

---

### 2. Errores de TypeScript en el IDE

**Síntoma**: Líneas rojas en VSCode, errores de tipos

**Causa**: Dependencias no instaladas o IDE no actualizado

**Solución**:
```bash
# 1. Instalar dependencias
npm install

# 2. Recargar VSCode
# Presiona: Ctrl+Shift+P
# Escribe: "Developer: Reload Window"
# Enter
```

---

### 3. "Context access might be invalid" (GitHub Actions)

**Síntoma**: Warnings en archivos `.yml`

**Causa**: Secrets no configurados en GitHub (normal en desarrollo local)

**Solución**: 
- ✅ **Ignorar estos warnings** - Solo aplican cuando subes el código a GitHub
- Para uso en GitHub: Configurar secrets en Settings → Secrets

---

### 4. Vulnerabilidades en Docker

**Síntoma**: "The image contains 2 high vulnerabilities"

**Solución**: ✅ **Ya corregido** - Actualizado a `node:20-alpine`

---

### 5. Error al ejecutar `npm run dev:all`

**Síntoma**: Error al iniciar aplicaciones

**Posibles causas y soluciones**:

**A) Dependencias no instaladas**
```bash
npm install
```

**B) Puerto ocupado**
```bash
# Ver qué está usando el puerto 3000
netstat -ano | findstr :3000

# Cambiar puerto en apps/backend/.env
PORT=3001
```

**C) Variables de entorno faltantes**
```bash
cd apps/backend
copy .env.example .env
# Editar .env con tus valores
```

---

### 6. Error al hacer build

**Síntoma**: `npm run build:all` falla

**Solución**:
```bash
# Limpiar y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force apps/*/node_modules
npm install

# Hacer build individual para identificar el problema
npm run backend:build
npm run mf-login:build
npm run host:build
```

---

### 7. CORS Error en Frontend

**Síntoma**: Error CORS al hacer peticiones al backend

**Solución**: Verificar que el backend esté configurado correctamente en `apps/backend/src/main.ts`:
```typescript
app.enableCors({
  origin: ['http://localhost:4200', 'http://localhost:4201'],
  credentials: true,
});
```

---

### 8. Module Federation no carga

**Síntoma**: Error al cargar microfrontend remoto

**Solución**:
```bash
# 1. Verificar que ambas apps estén ejecutándose
npm run mf-login:dev  # Puerto 4201
npm run host:dev      # Puerto 4200

# 2. Verificar remoteEntry.js accesible
# Abrir en navegador: http://localhost:4201/remoteEntry.js

# 3. Verificar configuración en webpack.config.js
```

---

### 9. JWT inválido

**Síntoma**: Error "Unauthorized" o "Invalid token"

**Solución**:
```bash
# 1. Verificar JWT_SECRET en .env
JWT_SECRET=tu-secret-key

# 2. Regenerar token haciendo login nuevamente
POST http://localhost:3000/auth/login
```

---

### 10. Terraform errores

**Síntoma**: Errores al ejecutar `terraform apply`

**Solución**:
```bash
cd infrastructure/terraform

# 1. Verificar formato
terraform fmt

# 2. Validar sintaxis
terraform validate

# 3. Ver plan detallado
terraform plan

# 4. Verificar Azure CLI
az login
az account show
```

---

## 🛠️ Comandos de Diagnóstico

```bash
# Ver versión de Node
node --version

# Ver versión de npm
npm --version

# Verificar estructura del proyecto
tree -L 2

# Ver procesos en puertos
netstat -ano | findstr :3000
netstat -ano | findstr :4200
netstat -ano | findstr :4201

# Limpiar cache de npm
npm cache clean --force

# Ver logs detallados
npm run backend:dev --verbose
```

---

## 📋 Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] ¿Ejecutaste `npm install`?
- [ ] ¿Tienes Node.js 18 o superior?
- [ ] ¿Copiaste `.env.example` a `.env` en backend?
- [ ] ¿Los puertos 3000, 4200, 4201 están libres?
- [ ] ¿Recargaste VSCode después de instalar?
- [ ] ¿Tienes permisos de administrador si es necesario?

---

## 🆘 Solución Nuclear (Último Recurso)

Si nada funciona, reinstalar todo desde cero:

```bash
# 1. Limpiar todo
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force apps/backend/node_modules
Remove-Item -Recurse -Force apps/mf-login/node_modules
Remove-Item -Recurse -Force apps/host/node_modules
Remove-Item -Recurse -Force package-lock.json
Remove-Item -Recurse -Force apps/*/package-lock.json

# 2. Reinstalar
npm install

# 3. Build
npm run build:all

# 4. Ejecutar
npm run dev:all
```

---

## 💡 Tips para Desarrollo

### Desarrollo Individual

En lugar de `npm run dev:all`, puedes ejecutar cada app individualmente:

```bash
# Terminal 1: Backend
cd apps/backend
npm run start:dev

# Terminal 2: MF Login
cd apps/mf-login
npm run start

# Terminal 3: Host
cd apps/host
npm run start
```

### Ver Logs Detallados

```bash
# Backend con logs
npm run backend:dev -- --debug

# Ver requests HTTP
# Usar herramientas como Postman o Thunder Client
```

### Hot Reload

Todos los proyectos tienen hot reload activado:
- Backend: Cambia archivos `.ts` y se recarga automáticamente
- Frontend: Cambia archivos `.ts`, `.html`, `.scss` y se recarga

---

## 📞 Soporte Adicional

Si sigues teniendo problemas:

1. **Verifica los logs** en la terminal
2. **Revisa la documentación** en `/docs`
3. **Busca en la carpeta** si hay un `ERROR.log`
4. **Verifica versiones**:
   ```bash
   node --version  # Debe ser >= 18
   npm --version   # Debe ser >= 9
   ```

---

## ✅ Estado Esperado Después de Solucionar

Después de ejecutar las soluciones:

- ✅ Sin errores de "módulo no encontrado"
- ✅ Sin líneas rojas en el IDE (excepto warnings menores)
- ✅ `npm run build:all` funciona sin errores
- ✅ `npm run dev:all` inicia las 3 aplicaciones
- ✅ Puedes acceder a http://localhost:3000/api/docs

---

**Última actualización**: Octubre 2025
