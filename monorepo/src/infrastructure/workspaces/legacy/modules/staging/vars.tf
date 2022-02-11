variable "environment" {
  type = string
  default = "staging"
}


variable "vpc_cidr_block" {
  type = string
  default = "10.1.0.0/16"
}

variable "cidr_block_public_a" {
  type = string
  default = "10.1.1.0/24"
}

variable "cidr_block_public_b" {
  type = string
  default = "10.1.2.0/24"
}

variable "cidr_block_private_a" {
  type = string
  default = "10.1.3.0/24"
}

variable "cidr_block_private_b" {
  type = string
  default = "10.1.4.0/24"
}



variable "availability_zone_a" {
  type = string
  default = "eu-north-1a"
}
variable "availability_zone_b" {
  type = string
  default = "eu-north-1b"
}


variable "database_username" {
  type = string
  default = "staging"
}
variable "database_password" {
  type = string
}