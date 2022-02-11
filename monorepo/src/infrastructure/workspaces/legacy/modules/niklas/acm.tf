provider "aws" {
  alias = "acm"  
  region = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_access_key
}


############################ BACKOFFICE DEV
resource "aws_acm_certificate" "certificate" {
  domain_name       = "backoffice-dev.cleangreen.se"
  validation_method = "DNS"
  provider =aws.acm
  tags = {
    Environment = "dev"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "certificate" {
  for_each = {
    for dvo in aws_acm_certificate.certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.backoffice_dev.zone_id
}





#################### API DEV ##############################
/*

resource "aws_acm_certificate" "certificate_api_dev" {
  domain_name       = "api-dev.cleangreen.se"
  validation_method = "DNS"
  provider =aws.acm
  tags = {
    Environment = "dev"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "certificate_api_dev" {
  for_each = {
    for dvo in aws_acm_certificate.certificate_api_dev.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.backend_dev.zone_id
}*/



############## CERTIFICATE Europe ####################

resource "aws_acm_certificate" "certificate_north" {
  domain_name       = "cleangreen.se"
  validation_method = "DNS"
  subject_alternative_names = [ "*.cleangreen.se" ]
  tags = {
    Environment = "production"
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "certificate_north" {
  for_each = {
    for dvo in aws_acm_certificate.certificate_north.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = "Z04709693QYYBOLEQXR41"
}
