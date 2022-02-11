resource "aws_eip" "openvpn_1" {
  vpc = true

  tags = {
    Owner       = "schar"
    Name        = "openvpn_1"
    Environment = "production"
    Application = "OpenVPN"
  }
}

resource "aws_eip_association" "openvpn_1_eip" {
  instance_id   = aws_instance.openvpn_1.id
  allocation_id = aws_eip.openvpn_1.id
}
