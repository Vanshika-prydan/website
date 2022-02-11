
##################### RDS ########################


resource "aws_security_group" "database_dev" {
  name        = "database"
  description = "Allow dtabase traffic"
  vpc_id      = aws_vpc.main.id
  ingress {
    description = "DATABASE"
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
    Name = "allow_tls"
  }
}

resource "aws_db_instance" "database_dev" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.1"
  instance_class       = "db.t3.micro"
  name                 = var.database_name
  username             =  var.database_user_dev
  password             = var.database_password_dev
  skip_final_snapshot  = true
  max_allocated_storage = 0
  publicly_accessible = true
  deletion_protection = true

  db_subnet_group_name = aws_db_subnet_group.database_dev_public.name
  vpc_security_group_ids = [ aws_security_group.database_dev.id ]
}

resource "aws_db_subnet_group" "database_dev" {
  name       = "database_subnet"
  subnet_ids = [aws_subnet.private.id,  aws_subnet.private_b.id ]

  tags = {
    Name = "Database dev subnet"
  }
}

resource "aws_db_subnet_group" "database_dev_public" {
  name       = "database_subnet_public"
  subnet_ids = [aws_subnet.public.id,  aws_subnet.public_b.id ]

  tags = {
    Name = "Database dev subnet"
  }
}
