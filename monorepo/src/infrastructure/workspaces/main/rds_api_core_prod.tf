resource "aws_db_instance" "api_core_db_prod" {
  # Allocate storage to 100 GB
  # We only use like 1 GB but allocate 100 GB so we get
  # some good IOPS included since AWS Provisioned IOPS is
  # way more expensive
  allocated_storage = 100
  # 0 to disable storage autoscaling
  max_allocated_storage = 0
  storage_type          = "gp2"

  engine         = "postgres"
  engine_version = "13.3"

  instance_class = "db.t3.small"

  identifier = "api-core-db-prod"
  name       = "api_core_db_prod"

  username            = var.api_core_db_prod_username
  password            = var.api_core_db_prod_password
  publicly_accessible = false
  storage_encrypted   = true

  allow_major_version_upgrade = false
  apply_immediately           = false
  auto_minor_version_upgrade  = true

  # Deploy in a highly available configuration
  # With multi_az to true there can be no
  # availability_zone_id as well
  multi_az = true

  # Keep backups for 5 days
  backup_retention_period  = 30
  delete_automated_backups = false
  copy_tags_to_snapshot    = true
  deletion_protection      = true
  skip_final_snapshot      = false

  # Enable export of audit, error and slowquery to CloudWatch logs
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  db_subnet_group_name   = aws_db_subnet_group.api_core_db_prod.name
  vpc_security_group_ids = [aws_security_group.api_core_db_prod.id]

  # option_group_name    = ""
  # parameter_group_name = ""

  tags = {
    Owner       = "schar"
    Environment = "production"
    Name        = "api_core_db_prod"
    Application = "api_core_db_prod"
  }
}
