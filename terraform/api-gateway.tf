resource "aws_apigatewayv2_api" "this" {
  name          = "lambda-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "auth-integration" {
  for_each = local.lambdas

  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.terraform-functions-lambda[each.key].invoke_arn
}

resource "aws_apigatewayv2_route" "auth-route" {
  for_each = local.lambdas

  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /${each.key}"
  target    = "integrations/${aws_apigatewayv2_integration.auth-integration[each.key].id}"
}

output "api_url" {
  value = aws_apigatewayv2_stage.this.invoke_url
}