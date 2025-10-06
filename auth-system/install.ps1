# Script de instalación para Windows PowerShell

Write-Host "🚀 Instalando dependencias del Auth System..." -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js no encontrado. Por favor instala Node.js 18+ desde https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Verificar npm
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ npm instalado: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📥 Instalando dependencias del monorepo..." -ForegroundColor Cyan

# Instalar dependencias root
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 ¡Instalación completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Configurar variables de entorno:"
Write-Host "     cd apps\backend"
Write-Host "     copy .env.example .env"
Write-Host ""
Write-Host "  2. Ejecutar en desarrollo:"
Write-Host "     npm run dev:all"
Write-Host ""
Write-Host "  3. Acceder a:"
Write-Host "     Backend API: http://localhost:3000"
Write-Host "     API Docs: http://localhost:3000/api/docs"
Write-Host "     Frontend Host: http://localhost:4200"
Write-Host "     MF Login: http://localhost:4201"
Write-Host ""
