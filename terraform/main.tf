variable "LabRole" {
  default = "arn:aws:iam::476809694749:role/LabRole"
}

variable "aws_account_id" {
  default = "476809694749"
}

provider "aws" {
  region                   = "us-east-1"
  # shared_credentials_files = ["/home/jaymeco/.aws/credentials"]
}

resource "null_resource" "build_modules" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = "${path.module}/build.sh"
  }
}

data "archive_file" "zip_application" {
  depends_on  = [null_resource.build_modules]
  type        = "zip"
  source_dir  = "${path.module}/../function/dist"
  output_path = "${path.module}/../function/dist.zip"
}

resource "aws_lambda_function" "terraform-functions-lambda" {
  depends_on = [data.archive_file.zip_application, aws_dynamodb_table.this]
  for_each   = local.lambdas

  role     = var.LabRole
  filename = "${path.module}/../function/dist.zip"

  function_name = "${each.key}-lambda"
  handler       = "app.${each.key}Handler"
  description   = each.value["description"]
  runtime       = "nodejs22.x"

  environment {
    variables = {
      JWT_SECRET = "sample"

      DYNAMO_TABLE_NAME = "postech"
    }
  }
}
resource "aws_lambda_permission" "api" {
  for_each = local.lambdas

  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.terraform-functions-lambda[each.key].arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:${var.aws_account_id}:${aws_apigatewayv2_api.this.id}/*/*"
}
