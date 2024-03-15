variable "ssh_ip_address" {
  type        = string
  description = "The IP address that should be allowed to connect to the instance over SSH."
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.7.4"
}

provider "aws" {
  region = "ap-southeast-2"
}


data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "all" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_key_pair" "portfolioapp4" {
  key_name   = "portfolioapp4"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDUYo9l42nAd4QuQHBc8UA+HrjhJ4oah5X2Z6/7q50GdFKtSuHO+IXw/ud0GGseDxPIqsiUixdJQzeHf3pvxmcL8/F3gteQYNbSwdBq2Gd4xcvu9TwHOs0OF0PyrEFgpHJFad3N5v4qkmqwx84dhwSnjuKx/KSITBbnmCwzSg2XHGoAfJeHAFwmPmBIgHs8A6t9efrcKFw9hnEwlCOkeBNaHa4apGGasY3IS1nYBnXSFJY3AIRLhHAn7cMphElJNIhuRzIkS0xXU3MbMcanc/CTs0jCSKHGndfmIJA/taA6+Aq14+Aag762UI6V9DcBr3cTOv9eDx+SMSmCo76K8sRn82NMr4mJ0PF4lAbrCJPtzX5lMv3Ix0bAkJ4ToTgrvqFWtrHthHONtnKj/1nSgEQcypg1HkaWKyaoNrtBfImdseLzzWzmt4Sh/QP37rCTqZCwIngrXYs6mtHLxGIMOR9oTFvWu8KajAT0Q1o+bPw1BkdZkdv3cUe0d5cBQYIZ0Dc= new@New-PC"
}

module "dev_ssh_sg" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "ec2_sg"
  description = "Security group for ec2_sg"
  vpc_id      = data.aws_vpc.default.id

  ingress_cidr_blocks = [var.ssh_ip_address]
  ingress_rules       = ["ssh-tcp"]
}

module "ec2_sg" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "ec2_sg"
  description = "Security group for ec2_sg"
  vpc_id      = data.aws_vpc.default.id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["http-80-tcp", "https-443-tcp", "https-5173-tcp", "all-icmp"]
  egress_rules        = ["all-all"]
}

resource "aws_instance" "app_server" {
  ami           = "ami-023eb5c021738c6d0"
  instance_type = "t2.micro"

  root_block_device {
    volume_size = 8
  }

  vpc_security_group_ids = [
    module.ec2_sg.security_group_id,
    module.dev_ssh_sg.security_group_id
  ]

  tags = {
    Name = "PortfolioAppServerInstance"
  }

  key_name = "portfolioapp4"

  user_data = <<-EOF
    #!/bin/bash
    set -ex
    sudo yum update -y
    sudo yum install docker -y
    sudo mkdir -p /usr/local/lib/docker/cli-plugins/
    sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
    sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
    sudo systemctl start docker
    sudo usermod -aG docker ec2-user
    sudo chmod 666 /var/run/docker.sock

  EOF
}