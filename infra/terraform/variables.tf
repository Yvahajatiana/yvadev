variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Project slug used for naming"
  type        = string
  default     = "yvadev"
}

variable "environment" {
  description = "Environment suffix"
  type        = string
  default     = "prod"
}

variable "server_type" {
  description = "Hetzner server type"
  type        = string
  default     = "cpx11"
}

variable "location" {
  description = "Hetzner server location"
  type        = string
  default     = "fsn1"
}

variable "image" {
  description = "Server image"
  type        = string
  default     = "ubuntu-24.04"
}

variable "ssh_public_key" {
  description = "SSH public key used for root access"
  type        = string
}

variable "domain_name" {
  description = "Primary domain name for the app"
  type        = string
  default     = "yvadev.fr"
}
