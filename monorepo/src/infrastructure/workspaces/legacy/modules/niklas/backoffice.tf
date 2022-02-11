resource "aws_route53_zone" "backoffice_dev" {
  name = "backoffice-dev.cleangreen.se"
  tags = {
    "Environment" = "dev"
  }
}

resource "aws_route53_record" "backoffice_dev" {
 
  zone_id = aws_route53_zone.backoffice_dev.zone_id
  name = "backoffice-dev.cleangreen.se"
  type = "A"

  depends_on = [
    aws_route53_record.certificate
  ]
  alias {
    name = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_s3_bucket" "backoffice_dev" {
  bucket = "backoffice-dev.cleangreen.se"
  acl    = "private"

  tags = {
    Name = "backoffice-dev.cleangreen.se"
    Environment = "DEV"
  }
}

resource "aws_s3_bucket_policy" "backoffice_dev" {
  bucket = aws_s3_bucket.backoffice_dev.id

  policy =  <<EOT
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "${aws_s3_bucket.backoffice_dev.arn}/*"
        }
    ]
}
EOT
}

locals {
  s3_origin_id = aws_s3_bucket.backoffice_dev.id
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "Some comment"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.backoffice_dev.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Distribution of the s3 bucket for backoffice-dev"
  default_root_object = "index.html"

  aliases = ["backoffice-dev.cleangreen.se"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  tags = {
    Environment = "development"
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.certificate.arn
    ssl_support_method = "sni-only"
  }
}

