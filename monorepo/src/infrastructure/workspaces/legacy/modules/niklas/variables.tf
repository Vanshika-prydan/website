variable "database_user_dev" {
  type = string
  default = "api"
}

variable "database_password_dev" {
  type = string
  default = "testtesttest"
}

variable "database_name" {
  type = string
  default = "wecleangreen"
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "aws_certificate_arn" {
  type = string
  default = "arn:aws:acm:us-east-1:620181086901:certificate/3ad82e87-d150-49cb-9dad-f7df11946344"
}