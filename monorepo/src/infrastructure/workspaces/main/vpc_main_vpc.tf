resource "aws_vpc" "main" {
  cidr_block = "10.1.0.0/16"

  tags = {
    Name        = "wcg_main_vpc"
    Environment = "production"
    Owner       = "schar"
  }
}
