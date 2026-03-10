output "public_ipv4" {
  description = "Public IPv4 address of the YvaDev server"
  value       = hcloud_server.web.ipv4_address
}

output "server_name" {
  description = "Provisioned server name"
  value       = hcloud_server.web.name
}

output "domain_name" {
  description = "Configured primary domain"
  value       = var.domain_name
}
