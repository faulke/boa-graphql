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
  public_subnets   = ["10.0.1.0/24"]
  private_subnets  = ["10.0.11.0/24", "10.0.12.0/24"]
  database_subnets = ["10.0.21.0/24", "10.0.22.0/24"]

  create_database_subnet_group = true
  
  tags = {
    Application = "boaguides"
    Environment = "prod"
  }
}

# nat instance in vpc public subnet
resource "aws_instance" "nat_instance" {
  ami           = "ami-0b840e8a1ce4cdf15"
  instance_type = "t2.micro"

  subnet_id       = "${element(module.vpc.public_subnets, 0)}"
  vpc_security_group_ids = ["${module.vpc.default_security_group_id}"]

  key_name = "boa-key"

  source_dest_check = false

  tags = {
    Application = "boaguides"
    Environment = "prod"
  }
}

# route from private subnets to nat instance
resource "aws_route" "nat_route" {
  depends_on = ["aws_instance.nat_instance"]
  count = "${length(module.vpc.private_route_table_ids)}"
  route_table_id = "${element(module.vpc.private_route_table_ids, count.index)}"
  destination_cidr_block = "0.0.0.0/0"
  network_interface_id = "${aws_instance.nat_instance.network_interface_id}"
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
