# Variables de configuración para Terraform
variable "location" {
  description = "Región de Azure donde se desplegarán los recursos"
  type        = string
  default     = "eastus"
}

variable "resource_group_name" {
  description = "Nombre del grupo de recursos"
  type        = string
  default     = "rg-auth-system"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "auth-system"
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "backend_docker_image" {
  description = "Imagen Docker del backend"
  type        = string
  default     = "ghcr.io/organization/auth-backend:latest"
}

variable "frontend_docker_image" {
  description = "Imagen Docker del frontend"
  type        = string
  default     = "ghcr.io/organization/auth-frontend:latest"
}

variable "jwt_secret" {
  description = "Secret para JWT"
  type        = string
  sensitive   = true
}
