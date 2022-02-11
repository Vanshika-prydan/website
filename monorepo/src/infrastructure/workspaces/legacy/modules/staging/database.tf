resource "aws_security_group" "name" {
  name        = "stagig database"
  description = "Allow dtabase traffic"
  vpc_id      = aws_vpc.main.id
  ingress {
    description = "access from fargate"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Allow postgres"
  }
}


resource "aws_db_instance" "default" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.2"
  instance_class       = "db.t3.micro"
  name                 = "staging"
  username             = var.database_username
  password             = var.database_password
  skip_final_snapshot  = true
  backup_retention_period = 30

  db_subnet_group_name = aws_db_security_group.default.name
  deletion_protection = true
}




resource "aws_db_security_group" "default" {
  name = "staging"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    "Name" = "Staging DB subnet group"
    Environment = var.environment
  }
}