locals {
  namespaced_service_name = "postech-teste"

  lambdas = {
    authentication = {
      description = "Autenticacao de usuarios"
    }
    authorization = {
      description = "Autorizacao de usuarios"
    }
  }
}