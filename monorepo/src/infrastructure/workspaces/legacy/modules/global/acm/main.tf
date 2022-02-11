resource "aws_acm_certificate" "cleangreen_se-certificate" {
  domain_name       = "cleangreen.se"
  validation_method = "DNS"

  subject_alternative_names = [ "*.cleangreen.se" ]

  lifecycle {
    create_before_destroy = true
  }
}
