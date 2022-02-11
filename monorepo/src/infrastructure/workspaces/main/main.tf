terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region     = "eu-north-1" # Stockholm
  access_key = var.aws_access_key
  secret_key = var.aws_secret_access_key
}

provider "aws" {
  region     = "us-east-1"
  alias      = "master_use1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_access_key
}
