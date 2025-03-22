resource "aws_dynamodb_table" "this" {
  name         = "postech"
  hash_key     = "cpf"
  billing_mode     = "PAY_PER_REQUEST"

  attribute {
    name = "cpf"
    type = "S"
  }
}