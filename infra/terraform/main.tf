provider "hcloud" {
  token = var.hcloud_token
}

locals {
  server_name = "${var.project_name}-${var.environment}"
}

resource "hcloud_ssh_key" "deploy" {
  name       = "${local.server_name}-deploy"
  public_key = var.ssh_public_key
}

resource "hcloud_server" "web" {
  name        = local.server_name
  image       = var.image
  server_type = var.server_type
  location    = var.location
  ssh_keys    = [hcloud_ssh_key.deploy.id]

  labels = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
  }
}

resource "hcloud_firewall" "web" {
  name = "${local.server_name}-firewall"

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  apply_to {
    server = hcloud_server.web.id
  }
}
