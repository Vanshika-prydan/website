resource "aws_route53_record" "vpn_cleangreen_se" {
  zone_id = data.aws_route53_zone.cleangreen_se.zone_id
  name    = "vpn.cleangreen.se"
  type    = "A"
  ttl     = "60"
  records = [aws_eip.openvpn_1.public_ip]
}

resource "aws_route53_record" "api_cleangreen_se" {
  zone_id = data.aws_route53_zone.cleangreen_se.zone_id
  name    = "api.cleangreen.se"
  type    = "A"

  alias {
    name                   = aws_lb.api_core_prod.dns_name
    zone_id                = aws_lb.api_core_prod.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "back_office_prod" {
  zone_id = data.aws_route53_zone.cleangreen_se.zone_id
  name    = "backoffice.cleangreen.se"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.back_office_prod.domain_name
    zone_id                = aws_cloudfront_distribution.back_office_prod.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "google_search_console" {
  zone_id = data.aws_route53_zone.cleangreen_se.zone_id
  name    = "cleangreen.se"
  type    = "TXT"
  ttl     = "60"
  records = ["google-site-verification=Hpbtsaxt2yDlEmj0dYo3gSDpVYUCAyKxkmCACmUZ0tA"]
}
