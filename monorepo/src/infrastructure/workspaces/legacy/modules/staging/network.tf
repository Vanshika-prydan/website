



###################### VPC ###################################


resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr_block
  instance_tenancy     = "default"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name        = "Staging VPC"
    Environment = var.environment
  }
}

###################### Security group for HTTPS ###################################

resource "aws_security_group" "allow_tls" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    description      = "TLS from VPC"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = [aws_vpc.main.cidr_block]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "Staging allow https"
    Environment = var.environment
  }
}



###################### Subnets ###################################

resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.cidr_block_public_a
  availability_zone = var.availability_zone_a
  map_public_ip_on_launch = true

  tags = {
    "Name"      = "Public A"
    Environment = var.environment
  }
}

resource "aws_subnet" "public_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.cidr_block_public_b
  availability_zone = var.availability_zone_a
  map_public_ip_on_launch =  true

  tags = {
    "Name"      = "Public B"
    Environment = var.environment
  }
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.cidr_block_private_a
  availability_zone = var.availability_zone_a

  tags = {
    "Name"      = "Private A"
    Environment = var.environment
  }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.cidr_block_private_b
  availability_zone = var.availability_zone_b

  tags = {
    "Name"      = "Private B"
    Environment = var.environment
  }
}


###################### Route tables ###################################

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "Public route table"
    Environment = var.environment
  }

  route = {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main
  }
}
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route = [ {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  } ]


  tags = {
    Name        = "Private route table"
    Environment = var.environment
  }
}


###################### Route table association ###################################
resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a
  route_table_id = aws_route_table.public.id
}
resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b
  route_table_id = aws_route_table.public.id
}
resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_a
  route_table_id = aws_route_table.private.id
}
resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_b
  route_table_id = aws_route_table.private.id
}

###################### Internet gateway ###################################

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "Stagig internet gateway"
    Environment = var.environment
  }
}

###################### Elastic IP address ###################################
resource "aws_eip" "nat" {
  vpc = true
  depends_on = [
    aws_internet_gateway.main
  ]
}

###################### Internet gateway ###################################
resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.ip
  subnet_id     = aws_subnet.public_a
  tags = {
    "Name"      = "Staging nat"
    Environment = var.environment
  }
  depends_on = [
    aws_internet_gateway
  ]
}
