variable "aws_access_key" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "api_core_db_prod_username" {
  type = string
}

variable "api_core_db_prod_password" {
  type = string
}


variable "redis_cache_dev_username" {
  default = "redis-user"
  type    = string
}
variable "redis_cache_dev_password" {
  type = string
}
