resource "aws_lb" "api_core_dev" {
  name               = "api-core-dev"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_tls.id]
  subnets            = [aws_subnet.public.id, aws_subnet.public_b.id]


  tags = {
    Environment = "dev"
    Name        = "api_core_dev"
  }
}

resource "aws_lb_target_group" "api_core_dev" {
  name        = "api-core-dev"
  port        = 8080
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled             = true
    healthy_threshold   = 10
    interval            = 30
    matcher             = "200"
    unhealthy_threshold = 5
    path                = "/health"
  }

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 3600
    enabled         = true
  }
}


resource "aws_lb_listener" "api_core_dev_https" {
  load_balancer_arn = aws_lb.api_core_dev.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.certificate_north.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api_core_dev.arn
  }
}

resource "aws_lb_listener" "api_core_dev_http" {
  load_balancer_arn = aws_lb.api_core_dev.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api_core_dev.arn
  }

  /*
  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }*/
}
