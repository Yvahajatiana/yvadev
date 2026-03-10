# YvaDev

YvaDev is a refonte of the `ia4dev` blog codebase for `https://yvadev.fr/`.
The application keeps the same Next.js foundation as AI4Dev while adding a production-ready delivery stack based on Docker, GitHub Actions, Terraform and Ansible.

## What is included

- Rebranding from AI4Dev to YvaDev on the core app shell.
- Docker image and local `docker-compose.yml`.
- GitHub Actions CI workflow for lint, type-check, build and Docker build.
- GitHub Actions deploy workflow for GHCR + Terraform + Ansible.
- Hetzner Cloud provisioning in `infra/terraform`.
- Server bootstrap and deployment in `infra/ansible`.

## Local development

```bash
npm ci
cp .env.local.example .env.local
npm run dev
```

Or with Docker:

```bash
docker compose up --build
```

## Required GitHub secrets

The deploy workflow expects these secrets:

- `GHCR_USERNAME`
- `GHCR_TOKEN`
- `HCLOUD_TOKEN`
- `HCLOUD_LOCATION`
- `HCLOUD_SERVER_TYPE`
- `DEPLOY_SSH_PUBLIC_KEY`
- `DEPLOY_SSH_PRIVATE_KEY`
- `APP_DOMAIN`

If `HCLOUD_LOCATION` or `HCLOUD_SERVER_TYPE` are omitted in GitHub, Terraform defaults to `fsn1` and `cpx11` in `infra/terraform/variables.tf`.

## Infrastructure layout

- `Dockerfile`: multi-stage Next.js standalone image.
- `.github/workflows/ci.yml`: quality checks and Docker build validation.
- `.github/workflows/deploy.yml`: image publish, Terraform apply, then Ansible deploy.
- `infra/terraform`: Hetzner server, firewall and SSH key registration.
- `infra/ansible`: Docker + Caddy provisioning and application rollout.

## Fork / repo rename

The source repository was cloned locally from `https://github.com/Yvahajatiana/ia4dev.git` into the `yvadev` folder.
Creating the GitHub fork itself still requires `gh auth login` on this machine before running `gh repo fork` or pushing to a new `Yvahajatiana/yvadev` repository.
