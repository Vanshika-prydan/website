data "aws_acm_certificate" "cleangreen_se-certificate-us-east-1" {
  domain      = "cleangreen.se"
  types       = ["AMAZON_ISSUED"]
  most_recent = true

  provider = aws.master_use1
}

data "aws_acm_certificate" "cleangreen_se-certificate-eu-north-1" {
  domain      = "cleangreen.se"
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}
