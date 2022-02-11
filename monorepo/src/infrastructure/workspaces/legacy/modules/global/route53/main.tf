resource "aws_route53_zone" "r53-zone-wecleangreen_se" {
  name = "cleangreen.se"
}

module "route53_zones" {
  source = "./zones"
}
