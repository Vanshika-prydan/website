terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_access_key
}

provider "aws" {
  alias      = "virginia"
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_access_key
}

module "route53" {
  source = "./modules/global/route53"
}

module "acm" {
  source = "./modules/global/acm"
  providers = {
    aws = aws.virginia
  }
}

module "niklas" {
  source = "./modules/niklas"
  aws_access_key = var.aws_access_key
  aws_secret_access_key = var.aws_secret_access_key
}

resource "aws_organizations_organization" "cleangreen_org" {
  feature_set = "ALL"
}


# Developer Account
resource "aws_organizations_account" "niklas_developer_account" {
  name      = "Niklas Johansson"
  email     = "niklas+cleangreen@sluh.se"
  parent_id = aws_organizations_organization.cleangreen_org.roots[0].id
}