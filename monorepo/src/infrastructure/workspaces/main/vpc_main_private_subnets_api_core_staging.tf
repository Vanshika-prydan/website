# -------------------------------
# AZ1
# -------------------------------

resource "aws_subnet" "wcg_main_vpc_private_subnet_api_core_staging_az1" {
  vpc_id               = aws_vpc.main.id
  cidr_block           = "10.1.41.0/24"
  availability_zone_id = "eun1-az1"

  tags = {
    Name        = "wcg_main_vpc_private_subnet_api_core_staging_az1"
    Environment = "staging"
    Owner       = "schar"
    Application = "api-core"
  }
}

resource "aws_route_table" "wcg_main_vpc_private_subnet_api_core_staging_az1_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "wcg_main_vpc_private_subnet_api_core_staging_az1_rt"
    Environment = "staging"
    Owner       = "schar"
    Application = "api-core"
  }
}

resource "aws_route_table_association" "wcg_main_vpc_private_subnet_api_core_staging_az1_rt_assoc" {
  subnet_id      = aws_subnet.wcg_main_vpc_private_subnet_api_core_staging_az1.id
  route_table_id = aws_route_table.wcg_main_vpc_private_subnet_api_core_staging_az1_rt.id
}

resource "aws_route" "api_core_staging_az1_route_to_nat_gw" {
  route_table_id         = aws_route_table.wcg_main_vpc_private_subnet_api_core_staging_az1_rt.id
  nat_gateway_id         = aws_nat_gateway.wcg_main_vpc_public_subnet_az1_ngw.id
  destination_cidr_block = "0.0.0.0/0"
}

# -------------------------------
# AZ2
# -------------------------------

resource "aws_subnet" "wcg_main_vpc_private_subnet_api_core_staging_az2" {
  vpc_id               = aws_vpc.main.id
  cidr_block           = "10.1.42.0/24"
  availability_zone_id = "eun1-az2"

  tags = {
    Name        = "wcg_main_vpc_private_subnet_api_core_staging_az2"
    Environment = "staging"
    Owner       = "schar"
    Application = "api-core"
  }
}

resource "aws_route_table" "wcg_main_vpc_private_subnet_api_core_staging_az2_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "wcg_main_vpc_private_subnet_api_core_staging_az2_rt"
    Environment = "staging"
    Owner       = "schar"
    Application = "api-core"
  }
}

resource "aws_route_table_association" "wcg_main_vpc_private_subnet_api_core_staging_az2_rt_assoc" {
  subnet_id      = aws_subnet.wcg_main_vpc_private_subnet_api_core_staging_az2.id
  route_table_id = aws_route_table.wcg_main_vpc_private_subnet_api_core_staging_az2_rt.id
}

resource "aws_route" "api_core_staging_az2_route_to_nat_gw" {
  route_table_id         = aws_route_table.wcg_main_vpc_private_subnet_api_core_staging_az2_rt.id
  nat_gateway_id         = aws_nat_gateway.wcg_main_vpc_public_subnet_az2_ngw.id
  destination_cidr_block = "0.0.0.0/0"
}
