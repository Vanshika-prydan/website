resource "aws_security_group" "openvpn_server" {
  name        = "openvpn_server"
  description = "SG for OpenVPN servers (open to internet"
  vpc_id      = aws_vpc.main.id

  tags = {
    Owner       = "schar"
    Environment = "production"
  }
}

# -----------------------------
# Ingress Rules
# -----------------------------

resource "aws_security_group_rule" "allow_ssh_schar_ip" {
  type        = "ingress"
  protocol    = "tcp"
  description = "Allow SSH traffic from Schar IP"

  from_port = 22
  to_port   = 22

  cidr_blocks = ["87.241.125.21/32"]

  security_group_id = aws_security_group.openvpn_server.id
}

resource "aws_security_group_rule" "allow_https" {
  type        = "ingress"
  protocol    = "tcp"
  description = "Allow HTTPS traffic from anywhere"

  from_port = 443
  to_port   = 443

  cidr_blocks      = ["0.0.0.0/0"]
  ipv6_cidr_blocks = ["::/0"]

  security_group_id = aws_security_group.openvpn_server.id
}

resource "aws_security_group_rule" "allow_http" {
  type        = "ingress"
  protocol    = "tcp"
  description = "Allow HTTP traffic from anywhere"

  from_port = 80
  to_port   = 80

  cidr_blocks      = ["0.0.0.0/0"]
  ipv6_cidr_blocks = ["::/0"]

  security_group_id = aws_security_group.openvpn_server.id
}

resource "aws_security_group_rule" "allow_openvpn" {
  type        = "ingress"
  protocol    = "udp"
  description = "Allow OpenVPN traffic from anywhere over 1194"

  from_port = 1194
  to_port   = 1194

  cidr_blocks      = ["0.0.0.0/0"]
  ipv6_cidr_blocks = ["::/0"]

  security_group_id = aws_security_group.openvpn_server.id
}

resource "aws_security_group_rule" "allow_openvpn_943_direct" {
  type        = "ingress"
  protocol    = "udp"
  description = "Allow OpenVPN traffic (direct 943) from anywhere"

  from_port = 943
  to_port   = 943

  cidr_blocks      = ["0.0.0.0/0"]
  ipv6_cidr_blocks = ["::/0"]

  security_group_id = aws_security_group.openvpn_server.id
}

# -----------------------------
# Egress Rules
# -----------------------------

resource "aws_security_group_rule" "allow_http_egress" {
  type        = "egress"
  protocol    = "tcp"
  description = "Allow HTTP egress anywhere"

  from_port = 80
  to_port   = 80

  cidr_blocks      = ["0.0.0.0/0"]
  ipv6_cidr_blocks = ["::/0"]

  security_group_id = aws_security_group.openvpn_server.id
}

resource "aws_security_group_rule" "allow_https_egress" {
  type        = "egress"
  protocol    = "tcp"
  description = "Allow HTTPS egress anywhere"

  from_port = 443
  to_port   = 443

  cidr_blocks      = ["0.0.0.0/0"]
  ipv6_cidr_blocks = ["::/0"]

  security_group_id = aws_security_group.openvpn_server.id
}

resource "aws_security_group_rule" "allow_all_egress_on_internal_network" {
  type        = "egress"
  protocol    = "-1"
  description = "Allow all egress on internal network"

  from_port = 0
  to_port   = 0

  cidr_blocks = ["10.1.0.0/16"]

  security_group_id = aws_security_group.openvpn_server.id
}
