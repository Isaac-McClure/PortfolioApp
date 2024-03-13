terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.7.4"
}

provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_instance" "app_server" {
  ami = "ami-023eb5c021738c6d0"
  instance_type = "t2.micro"

  tags = {
    Name = "PortfolioAppServerInstance"
  }
}

  