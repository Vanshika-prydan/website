# -----------------------------------------
# AZ1
# -----------------------------------------

resource "aws_subnet" "wcg_main_vpc_public_subnet_az1" {
  vpc_id               = aws_vpc.main.id
  cidr_block           = "10.1.10.0/24"
  availability_zone_id = "eun1-az1"

  tags = {
    Name        = "wcg_main_vpc_public_subnet_az1"
    Environment = "production"
    Owner       = "schar"
  }
}

# NAT Gateway -------------------------------------------------

resource "aws_eip" "wcg_main_vpc_public_subnet_az1_ngw_eip" {
  vpc = true

  tags = {
    Name = "wcg_main_vpc_public_subnet_az1_ngw_eip"
  }
}

resource "aws_nat_gateway" "wcg_main_vpc_public_subnet_az1_ngw" {
  allocation_id = aws_eip.wcg_main_vpc_public_subnet_az1_ngw_eip.id
  subnet_id     = aws_subnet.wcg_main_vpc_public_subnet_az1.id

  tags = {
    Name = "wcg_main_vpc_public_subnet_az1_ngw"
  }
}

# Route Table -------------------------------------------------

resource "aws_route_table" "wcg_main_vpc_public_subnet_az1_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "wcg_main_vpc_public_subnet_az1_rt"
    Environment = "production"
    Owner       = "schar"
  }
}

resource "aws_route_table_association" "wcg_main_vpc_public_subnet_az1_rt_assoc" {
  subnet_id      = aws_subnet.wcg_main_vpc_public_subnet_az1.id
  route_table_id = aws_route_table.wcg_main_vpc_public_subnet_az1_rt.id
}

# Route to IGW
resource "aws_route" "wcg_main_vpc_public_subnet_az1_rt_igw" {
  route_table_id         = aws_route_table.wcg_main_vpc_public_subnet_az1_rt.id
  gateway_id             = aws_internet_gateway.main_vpc_igw.id
  destination_cidr_block = "0.0.0.0/0"
}

# -----------------------------------------
# AZ2
# -----------------------------------------

resource "aws_subnet" "wcg_main_vpc_public_subnet_az2" {
  vpc_id               = aws_vpc.main.id
  cidr_block           = "10.1.11.0/24"
  availability_zone_id = "eun1-az2"

  tags = {
    Name        = "wcg_main_vpc_public_subnet_az2"
    Environment = "production"
    Owner       = "schar"
  }
}

# NAT Gateway -------------------------------------------------

resource "aws_eip" "wcg_main_vpc_public_subnet_az2_ngw_eip" {
  vpc = true

  tags = {
    Name = "wcg_main_vpc_public_subnet_az2_ngw_eip"
  }
}

resource "aws_nat_gateway" "wcg_main_vpc_public_subnet_az2_ngw" {
  allocation_id = aws_eip.wcg_main_vpc_public_subnet_az2_ngw_eip.id
  subnet_id     = aws_subnet.wcg_main_vpc_public_subnet_az2.id

  tags = {
    Name = "wcg_main_vpc_public_subnet_az2_ngw"
  }
}

# Route Table -------------------------------------------------

resource "aws_route_table" "wcg_main_vpc_public_subnet_az2_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "wcg_main_vpc_public_subnet_az2_rt"
    Environment = "production"
    Owner       = "schar"
  }
}

resource "aws_route_table_association" "wcg_main_vpc_public_subnet_az2_rt_assoc" {
  subnet_id      = aws_subnet.wcg_main_vpc_public_subnet_az2.id
  route_table_id = aws_route_table.wcg_main_vpc_public_subnet_az2_rt.id
}

# Route to IGW
resource "aws_route" "wcg_main_vpc_public_subnet_az2_rt_igw" {
  route_table_id         = aws_route_table.wcg_main_vpc_public_subnet_az2_rt.id
  gateway_id             = aws_internet_gateway.main_vpc_igw.id
  destination_cidr_block = "0.0.0.0/0"
}
