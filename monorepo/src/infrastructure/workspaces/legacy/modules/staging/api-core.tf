resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"

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

  tags = {
    Environment = var.environment
  }
}

resource "aws_iam_role_policy" "AmazonECSTaskExecutionRolePolicy" {
    name = "AmazonECSTaskExecutionRolePolicy"
    role = aws_iam_role.ecs_task_execution_role.id

    policy = <<EOF
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
    EOF
}


resource "aws_iam_role" "ecs_task_role" {
  name = "ecs_task_execution_role"

}




resource "aws_ecs_task_definition" "api_core" {
  family = "api-core"
  task_role_arn = aws_iam_role.ecs_task_role.arn
  execution_role_arn = aws_iam_role.ecs_task_execution_role
  network_mode = "awsvpc"
  requires_compatibilities = [ "FARGATE" ]
  memory = 1024
  cpu = 512
  
  container_definitions = jsonencode([
    {
      name      = "api_core"
      image     = "" #"620181086901.dkr.ecr.eu-north-1.amazonaws.com/core_api:latest"
      essential = true
      cpu       = 512
      memory    = 1024

      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
  }])
}

resource "aws_ecs_cluster" "api_core" {
  name = "api-core"
}


resource "aws_ecs_service" "api_core" {
    name = "api-core"
    launch_type = "FARGATE"
    cluster = aws_ecs_cluster.api_core.id
    task_definition = aws_ecs_task_definition.api_core.arn
    desired_count = 2
}