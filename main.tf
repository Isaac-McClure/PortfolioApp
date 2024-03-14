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

data "aws_key_pair" "portfolioapp3" {
  key_name           = "portfolioapp3"
  include_public_key = true

  filter {
    name   = "tag:Component"
    values = ["web"]
  }
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
  ingress_rules       = ["http-80-tcp", "https-443-tcp", "all-icmp"]
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

  key_name = "portfolioapp3"

  user_data = <<-EOF
    #!/bin/bash
    set -ex
    sudo yum update -y
    sudo yum install docker -y
    sudo yum install docker-compose-plugin -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user

  EOF
}