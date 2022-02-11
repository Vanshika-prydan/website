resource "aws_lb" "api_core_prod" {
  name               = "api-core-prod"
  internal           = false
  load_balancer_type = "application"

  security_groups = [aws_security_group.api_core_alb_prod.id]
  subnets = [
    aws_subnet.wcg_main_vpc_public_subnet_az1.id,
    aws_subnet.wcg_main_vpc_public_subnet_az2.id
  ]

  enable_deletion_protection = true

  # TODO: Enable logs
  /*access_logs {
    bucket  = ""
    prefix  = ""
    enabled = true
  }*/

  tags = {
    Environment = "production"
    Owner       = "schar"
    Name        = "api_core_prod"
    Application = "api_core"
  }
}


resource "aws_lb_target_group" "api_core_prod" {
  name        = "api-core-prod"
  port        = 8080
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    matcher             = "200,302,201"
    unhealthy_threshold = 5
    path                = "/health"
    protocol            = "HTTP"
  }

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 3600
    enabled         = true
  }
}

resource "aws_lb_listener" "api_core_prod" {
  load_balancer_arn = aws_lb.api_core_prod.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = data.aws_acm_certificate.cleangreen_se-certificate-eu-north-1.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api_core_prod.arn
  }

  depends_on = [
    data.aws_acm_certificate.cleangreen_se-certificate-eu-north-1
  ]
}
