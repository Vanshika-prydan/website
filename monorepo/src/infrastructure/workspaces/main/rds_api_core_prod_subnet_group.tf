resource "aws_db_subnet_group" "api_core_db_prod" {
  name = "api_core_db_prod"

  subnet_ids = [
    aws_subnet.wcg_main_vpc_private_subnet_api_core_prod_az1.id,
    aws_subnet.wcg_main_vpc_private_subnet_api_core_prod_az2.id,
  ]

  tags = {
    Environment = "production"
    Owner       = "schar"
    Application = "api-core"
    Name        = "api_core_db_prod"
  }
}
