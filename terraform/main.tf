variable "LabRole" {
  default = "arn:aws:iam::055653651246:role/LabRole"
}

provider "aws" {
  region = "us-east-1"
  shared_credentials_files = ["/home/jaymeco/.aws/credentials"]
}

data "archive_file" "zip_application" {
  type = "zip"
  source_dir = "${path.module}/../function/dist"
  output_path = "${path.module}/../function/dist.zip"
}

resource "aws_lambda_function" "terraform-authentication-lambda" {
  role = var.LabRole
  filename = "${path.module}/../function/dist.zip"
  function_name = "authentication-lambda"
  runtime = "nodejs22.x"
  handler = "app.authHandler"
}

resource "aws_lambda_function" "terraform-authorization-lambda" {
  role = var.LabRole
  filename = "${path.module}/../function/dist.zip"
  function_name = "authorization-lambda"
  runtime = "nodejs22.x"
  handler = "app.authorizationHandler"
}
