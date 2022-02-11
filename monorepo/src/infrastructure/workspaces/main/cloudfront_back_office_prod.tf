resource "aws_cloudfront_origin_access_identity" "back_office_prod" {
  comment = "Backoffice prod cloudfront access identity"
}

resource "aws_cloudfront_distribution" "back_office_prod" {
  origin {
    domain_name = aws_s3_bucket.back_office_prod.bucket_regional_domain_name
    origin_id   = "s3_back_office_prod"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.back_office_prod.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["backoffice.cleangreen.se"]

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"] //"DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3_back_office_prod"

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
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cleangreen_se-certificate-us-east-1.arn
    ssl_support_method  = "sni-only"
  }
}
