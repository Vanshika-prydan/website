resource "aws_instance" "openvpn_1" {
  ami           = "ami-0ff338189efb7ed37"
  instance_type = "t3.micro"

  subnet_id  = aws_subnet.wcg_main_vpc_public_subnet_az1.id
  private_ip = "10.1.10.15"

  disable_api_termination = false

  vpc_security_group_ids = [aws_security_group.openvpn_server.id]

  key_name = "schar"

  root_block_device {
    delete_on_termination = false
    encrypted             = true
    volume_size           = 20
    volume_type           = "gp2"
  }

  tags = {
    Name        = "openvpn_1"
    Environment = "production"
    Owner       = "schar"
    Application = "OpenVPN"
  }
}
