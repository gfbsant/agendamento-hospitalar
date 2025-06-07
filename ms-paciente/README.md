# Microsserviço - ms-paciente

Este microsserviço é responsável pelos dados cadastrais de pacientes e o sistema de pontos utilizado para consultas médicas.

---

## ✅ Funcionalidades

- Cadastro de paciente
- Compra de pontos (R$ → Pontos)
- Uso e cancelamento do uso de pontos
- Histórico e extrato de transações de pontos
- Integração via API Gateway

---

## 🚀 Requisitos

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/)
- Java 21 (para builds locais)
- Maven 3.8+ (caso queira compilar manualmente)

---

## 📁 Estrutura do projeto (resumo)

```
ms-paciente/
├── src/
├── pom.xml
├── Dockerfile
```

---

## 🛠️ Passo a passo para rodar com Docker

### 1. Compilar o projeto

Abra o terminal na pasta `ms-paciente/` e execute:

```bash
./mvnw clean package -DskipTests
```

> Isso vai gerar o arquivo `target/ms-paciente-0.0.1-SNAPSHOT.jar`

---

### 2. Criar imagem Docker

```bash
docker build -t ms-paciente-image .
```

---

### 3. Subir com Docker Compose (pelo projeto principal)

Volte à raiz do projeto (onde está o `docker-compose.yml`) e execute:

```bash
docker compose up --build
```

> Isso vai iniciar os microsserviços, o banco PostgreSQL e o API Gateway.

---

## 📡 Testando o microsserviço

Use o [Postman](https://www.postman.com/) ou `curl` para testar os endpoints via gateway:

```bash
# Cadastro
curl -X POST http://localhost:8080/paciente/registrar \
  -H "Content-Type: application/json" \
  -d '{"cpf":"12345678900","nome":"Maria","email":"maria@teste.com","endereco":"Rua A","cep":"80000-000"}'

# Compra de pontos
curl -X POST http://localhost:8080/paciente/comprar-pontos \
  -H "Content-Type: application/json" \
  -d '{"cpf":"12345678900","valorReais":50,"pontos":10}'

# Extrato
curl http://localhost:8080/paciente/extrato?cpf=12345678900
```

---

## 🧯 Parar os containers

```bash
docker compose down
```

---

## 📌 Observações

- O microsserviço roda em `http://localhost:8080/paciente/...` via API Gateway.
- O banco PostgreSQL utilizado é iniciado automaticamente pelo `docker-compose`.

---

