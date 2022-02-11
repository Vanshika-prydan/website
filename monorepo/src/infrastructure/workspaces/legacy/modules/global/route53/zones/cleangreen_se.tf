# ------------------------------------------------
# Records for G Suite
# ------------------------------------------------
resource "aws_route53_record" "cleangreen_se-mx" {
  zone_id = "Z04709693QYYBOLEQXR41"
  name    = "cleangreen.se"
  type    = "MX"
  ttl     = "300"
  records = [
    "1 ASPMX.L.GOOGLE.COM.",
    "5 ALT1.ASPMX.L.GOOGLE.COM.",
    "5 ALT2.ASPMX.L.GOOGLE.COM.",
    "10 ALT3.ASPMX.L.GOOGLE.COM.",
    "10 ALT4.ASPMX.L.GOOGLE.COM.",
    "15 pixz77tuhbtdgroancrvzrrbybiububeeughsp2cmijk7bldu4xa.mx-verification.google.com."
  ]
}

# ------------------------------------------------
# ACM
# ------------------------------------------------
resource "aws_route53_record" "cleangreen_se-acm" {
  zone_id = "Z04709693QYYBOLEQXR41"
  name    = "_ee11d2acf533983638d269be43bc2422.cleangreen.se."
  type    = "CNAME"
  ttl     = "5"
  records = ["_0dd368e3f257f4ab04377f9a4ff404b6.rlltrpyzyf.acm-validations.aws."]
}

# ------------------------------------------------
# Sites
# ------------------------------------------------
resource "aws_route53_record" "cleangreen_se-root" {
  zone_id = "Z04709693QYYBOLEQXR41"
  name    = "cleangreen.se"
  type    = "A"

  alias {
    name                   = "deni1648g6zms.cloudfront.net"
    zone_id                = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}
