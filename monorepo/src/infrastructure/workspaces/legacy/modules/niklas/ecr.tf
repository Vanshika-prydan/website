locals {
    aws_ecr_lifecycle_policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 10 images",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["v"],
                "countType": "imageCountMoreThan",
                "countNumber": 10
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
    aws_ecr_repository_policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "Core api",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
        }
    ]
}
EOF
}


resource "aws_ecr_repository" "core_api" {
  name                 = "core_api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "core_api_nginx" {
  name                 = "core_api_nginx"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository_policy" "core_api" {
  repository = aws_ecr_repository.core_api.name
  policy = local.aws_ecr_repository_policy

}
resource "aws_ecr_repository_policy" "core_api_nginx" {
  repository = aws_ecr_repository.core_api_nginx.name
  policy = local.aws_ecr_repository_policy

}

resource "aws_ecr_lifecycle_policy" "core_api" {
  repository = aws_ecr_repository.core_api.name
  policy = local.aws_ecr_lifecycle_policy
}
resource "aws_ecr_lifecycle_policy" "core_api_nginx" {
  repository = aws_ecr_repository.core_api_nginx.name
  policy = local.aws_ecr_lifecycle_policy
}