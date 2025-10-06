# Outputs de Terraform
output "resource_group_name" {
  description = "Nombre del Resource Group"
  value       = azurerm_resource_group.main.name
}

output "backend_url" {
  description = "URL del backend API"
  value       = "https://${azurerm_container_app.backend.ingress[0].fqdn}"
}

output "frontend_host_url" {
  description = "URL de la aplicación host"
  value       = "https://${azurerm_container_app.frontend_host.ingress[0].fqdn}"
}

output "mf_login_url" {
  description = "URL del microfrontend de login"
  value       = "https://${azurerm_container_app.mf_login.ingress[0].fqdn}"
}

output "container_app_environment_id" {
  description = "ID del Container App Environment"
  value       = azurerm_container_app_environment.main.id
}

output "log_analytics_workspace_id" {
  description = "ID del Log Analytics Workspace"
  value       = azurerm_log_analytics_workspace.main.id
}
