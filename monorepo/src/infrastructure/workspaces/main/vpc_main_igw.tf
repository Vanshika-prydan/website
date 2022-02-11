resource "aws_internet_gateway" "main_vpc_igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "wcg_main_vpc_igw"
    Environment = "production"
    Owner       = "schar"
  }
}
