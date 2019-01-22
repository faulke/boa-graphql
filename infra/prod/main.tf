# s3 backend
terraform {
  backend "s3" {
    bucket = "boa-infra"
    key    = "prod/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = "us-west-2"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "1.50.0"

  name = "boa-prod-vpc"

  cidr = "10.0.0.0/16"

  azs              = ["us-west-2a", "us-west-2b"]
  private_subnets  = ["10.0.11.0/24", "10.0.12.0/24"]
  database_subnets = ["10.0.21.0/24", "10.0.22.0/24"]

  create_database_subnet_group = true
  
  tags = {
    Application = "boaguides"
    Environment = "prod"
  }
}

# db security group 5432 ingress
module "db_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "2.10.0"

  name        = "boa-db-sg"
  description = "Security group for RDS instance"
  vpc_id      = "${module.vpc.vpc_id}"

  ingress_cidr_blocks = ["${module.vpc.private_subnets_cidr_blocks}"]
  ingress_rules = ["postgresql-tcp"]
}

module "rds" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${var.db_name}"

  engine            = "postgres"
  engine_version    = "10.4"
  instance_class    = "db.t2.micro"
  allocated_storage = 20

  name     = "${var.db_name}"
  username = "${var.db_user}"
  password = "${var.db_password}"
  port     = 5432

  db_subnet_group_name = "${module.vpc.database_subnet_group}"

  vpc_security_group_ids = [
    "${module.vpc.default_security_group_id}",
    "${module.db_sg.this_security_group_id}"
  ]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  family = "postgres10"
}
