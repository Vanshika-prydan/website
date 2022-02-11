# -----------------------------------
# VPC Variables
# -----------------------------------

variable "vpc_cidr_block" {
  type        = string
  description = "CIDR block for VPC"
}

variable "vpc_enable_dns_support" {
  type        = bool
  description = ""
  default     = true
}

variable "vpc_enable_dns_hostnames" {
  type        = bool
  description = ""
  default     = false
}

# -----------------------------------
# Subnet Variables
# -----------------------------------
