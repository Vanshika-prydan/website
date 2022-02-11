data "aws_iam_policy_document" "ecs_task_execution_role" {
  version = "2012-10-17"
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "ecs-prod-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}



resource "aws_ecs_task_definition" "api_core_prod" {
  family                   = "api_core_prod"
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                      = 1024
  memory                   = 2048
  requires_compatibilities = ["FARGATE"]

  container_definitions = jsonencode([{
    name      = "api_core_prod"
    image     = "${aws_ecr_repository.api_core_prod.repository_url}:latest"
    cpu       = 1024
    memory    = 2048
    essential = true

    portMappings = [
      {
        containerPort = 8080
        hostPort      = 8080
      }
    ]
  }])
}

resource "aws_ecs_cluster" "api_core_prod" {
  name = "api_core_prod"
}

data "aws_ecs_task_definition" "api_core_prod" {
  task_definition = aws_ecs_task_definition.api_core_prod.family
}

resource "aws_ecs_service" "api_core_prod" {
  name            = "api_core_prod"
  cluster         = aws_ecs_cluster.api_core_prod.arn
  task_definition = "${aws_ecs_task_definition.api_core_prod.family}:${max(aws_ecs_task_definition.api_core_prod.revision, data.aws_ecs_task_definition.api_core_prod.revision)}" //aws_ecs_task_definition.api_core_prod.arn
  launch_type     = "FARGATE"

  deployment_maximum_percent         = 400
  deployment_minimum_healthy_percent = 100
  desired_count                      = 2
  force_new_deployment               = true

  load_balancer {
    target_group_arn = aws_lb_target_group.api_core_prod.arn
    container_name   = "api_core_prod"
    container_port   = 8080
  }

  network_configuration {
    assign_public_ip = false
    security_groups  = [aws_security_group.api_core_ecs_prod.id]
    subnets          = [aws_subnet.wcg_main_vpc_private_subnet_api_core_prod_az1.id, aws_subnet.wcg_main_vpc_private_subnet_api_core_prod_az2.id]
  }

  depends_on = [
    aws_iam_role.ecs_task_execution_role,
    aws_ecs_task_definition.api_core_prod
  ]
}
