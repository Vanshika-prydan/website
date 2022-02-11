resource "aws_security_group" "api_core_ecs_prod" {
  name        = "api_core_ecs_prod"
  description = "Security Group for API Core ECS prod"
  vpc_id      = aws_vpc.main.id

  tags = {
    Environment = "production"
    Owner       = "schar"
    Application = "api-core"
    Name        = "api_core_ecs_prod"
  }
}

# ------------------------------------
# Ingress
# ------------------------------------

resource "aws_security_group_rule" "api_core_ecs_prod_ingress_port" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  ipv6_cidr_blocks  = ["::/0"]
  security_group_id = aws_security_group.api_core_ecs_prod.id
}



# ------------------------------------
# Egress
# ------------------------------------

resource "aws_security_group_rule" "api_core_ecs_prod_egress_all" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  ipv6_cidr_blocks  = ["::/0"]
  security_group_id = aws_security_group.api_core_ecs_prod.id
}
