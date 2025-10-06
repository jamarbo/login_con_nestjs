# Infraestructura con Terraform

Este directorio contiene la definición de infraestructura como código (IaC) para Azure usando Terraform.

## 📦 Recursos Provisionados

- **Resource Group**: Contenedor lógico para todos los recursos
- **Log Analytics Workspace**: Monitoreo y logs centralizados
- **Container App Environment**: Entorno compartido para Container Apps
- **Container Apps**:
  - Backend API (NestJS)
  - Frontend Host (Angular)
  - Microfrontend Login (Angular)

## 🚀 Uso

### Prerrequisitos

```bash
# Instalar Terraform
# https://www.terraform.io/downloads

# Instalar Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login a Azure
az login
```

### Despliegue

```bash
# 1. Copiar variables de ejemplo
cp terraform.tfvars.example terraform.tfvars

# 2. Editar terraform.tfvars con tus valores

# 3. Inicializar Terraform
terraform init

# 4. Planificar cambios
terraform plan

# 5. Aplicar cambios
terraform apply

# 6. Ver outputs
terraform output
```

### Destruir Recursos

```bash
terraform destroy
```

## 🏗️ Arquitectura Azure

```
Resource Group
├── Log Analytics Workspace
├── Container App Environment
│   ├── Backend Container App (NestJS)
│   ├── Frontend Host Container App (Angular)
│   └── MF Login Container App (Angular)
└── Networking (automático con Container Apps)
```

## ⚙️ Configuración

### Variables Principales

- `location`: Región de Azure (default: eastus)
- `resource_group_name`: Nombre del grupo de recursos
- `project_name`: Nombre del proyecto
- `environment`: Ambiente (dev/staging/prod)
- `backend_docker_image`: Imagen Docker del backend
- `frontend_docker_image`: Imagen Docker del frontend
- `jwt_secret`: Secret para tokens JWT (sensible)

### Escalado Automático

Los Container Apps se configuran con:
- **Backend**: Min 1, Max 3 replicas
- **Frontend Host**: Min 1, Max 3 replicas
- **MF Login**: Min 1, Max 2 replicas

## 🔒 Seguridad

- Secrets manejados con Terraform sensitive variables
- JWT Secret almacenado como secret en Container App
- En producción: usar Azure Key Vault
- HTTPS habilitado automáticamente en ingress

## 📊 Monitoreo

Log Analytics Workspace configurado para:
- Application logs
- System logs
- Metrics y alertas

## 💰 Costos

Container Apps pricing:
- Consumption tier: ~$0.000024/vCPU-second
- 180,000 vCPU-seconds gratis/mes
- Ideal para cargas de trabajo pequeñas/medianas

## 🔄 CI/CD Integration

Ver `.github/workflows/` para integración con deployment pipeline.

## 📝 Notas

- Estado de Terraform local (para producción usar remote backend)
- Considerar Azure Key Vault para secrets en producción
- Revisar y ajustar SKUs según necesidades
- Configurar custom domains si es necesario
