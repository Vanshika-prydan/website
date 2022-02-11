
locals {
  launch_type = "FARGATE"
}


resource "aws_route53_zone" "backend_dev" {
  name = "api-dev.cleangreen.se"
  tags = {
    "Environment" = "dev"
  }
}

resource "aws_route53_record" "backend_dev" {
 
  zone_id = aws_route53_zone.backend_dev.zone_id
  name = "api-dev.cleangreen.se"
  type = "A"

  alias {
    name = aws_lb.api_core_dev.dns_name
    zone_id = aws_lb.api_core_dev.zone_id
    evaluate_target_health = false
  }
}


resource "aws_iam_policy" "access_ecr_containers" {
    name = "access_ecr_container_policy"
    policy = <<EOT
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
EOT
}

resource "aws_iam_role" "access_ecr_containers" {
  name = "access_ecr_containers_roles"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
  EOF
}



resource "aws_iam_role_policy_attachment" "test-access_ecr_containers" {
  role       = aws_iam_role.access_ecr_containers.name
  policy_arn = aws_iam_policy.access_ecr_containers.arn
}


resource "aws_ecs_task_definition" "backend_dev" {
  family = "back-end-dev"
  network_mode = "awsvpc"
  container_definitions = jsonencode([
    {
      name      = "api_core"
      image     = "620181086901.dkr.ecr.eu-north-1.amazonaws.com/core_api:latest"
      essential = true
      cpu       = 256
      memory    = 512
      
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
    }/*,
    {
      name      = "api_core_nginx"
      image     = "620181086901.dkr.ecr.eu-north-1.amazonaws.com/core_api_nginx:latest"
      essential = true
#      links     = ["api_core"]
      portMappings = [
        {
          containerPort = 433
          hostPort      = 433
        }
#        ,
#        {
#          containerPort = 80
#          hostPort      = 80
#        }
      ]
    }*/
  ])
  task_role_arn = aws_iam_role.access_ecr_containers.arn
  execution_role_arn  = aws_iam_role.access_ecr_containers.arn
  requires_compatibilities = [ "FARGATE" ]
  memory = 512
  cpu = 256
}


resource "aws_ecs_cluster" "backend_dev" {
  name = "backend_dev"
}


resource "aws_ecs_service" "backend_dev" {
  name                = "backend_dev"
  cluster             = aws_ecs_cluster.backend_dev.arn
  task_definition     = aws_ecs_task_definition.backend_dev.arn
  launch_type         = local.launch_type

  deployment_maximum_percent            = 200
  deployment_minimum_healthy_percent    = 100
  desired_count                         = 2
  force_new_deployment                  = true

  network_configuration {
      assign_public_ip = true
      security_groups = [aws_security_group.allow_tls.id]
      subnets = [ aws_subnet.public.id, aws_subnet.public_b.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.api_core_dev.arn
    container_name   = "api_core"
    container_port   = 8080
  }
}
