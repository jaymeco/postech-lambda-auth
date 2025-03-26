# Lambda de Autentica e Autorizacao

## Execução do Terraform

Dentro do diretorio /terraform, existe os arquivos de execução do terraform. Os arquivos terraform provisionam todo ambiente para a AWS Lambda.

Para que a execução ocorrem com sucesso, é necessário criar um S3 bucket na AWS com o seguinte nome:

```
postech-lambda-state
```

OBS.: Lembre-se de adicionar as credenciais de acesso na aws para a execução!

### Comandos para a excução do terraform

#### Inicialização do backend

```
terraform init -backend=true -backend-config="config/backend.hcl"
```

#### Validação dos arquivos terraform

```
terraform validate
```

#### Aplicação das configurações

```
terraform apply -auto-approve
```