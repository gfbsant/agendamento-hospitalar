# Microsserviço - ms-consulta

O microsserviço `ms-consulta` é responsável pelo agendamento e gerenciamento de consultas médicas, incluindo uso de pontos, cancelamento e check-in.

---

## ✅ Funcionalidades

- Agendamento de consulta (com uso de pontos e pagamento parcial)
- Listagem de agendamentos por paciente
- Cancelamento de agendamentos (devolve pontos)
- Check-in da consulta (disponível 48h antes)

---

## 🚀 Requisitos

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/)
- Java 21 (para builds locais)
- Maven 3.8+

---

## 📁 Estrutura do projeto (resumo)

```
ms-consulta/
├── src/
│   ├── main/
│   │   ├── java/br/ufpr/hospital/msconsulta/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── config/
│   │   └── resources/
│   │       └── application.yml
├── Dockerfile
├── pom.xml
```

---

## 🛠️ Como rodar com Docker

### 1. Compilar o projeto

```bash
./mvnw clean package -DskipTests
```

> Isso gera o arquivo `target/ms-consulta-1.jar`

---

### 2. Criar a imagem Docker

```bash
docker build -t ms-consulta-image .
```

---

### 3. Subir pelo Docker Compose (na raiz do projeto principal)

```bash
docker compose up --build
```

---

## 📡 Endpoints principais

| Método | URL                                       | Descrição                           |
|--------|-------------------------------------------|-------------------------------------|
| POST   | `/consulta/agendar`                       | Agendar nova consulta               |
| GET    | `/consulta/agendamentos?cpf=...`          | Listar agendamentos do paciente     |
| POST   | `/consulta/cancelar/{codigo}`             | Cancelar consulta                   |
| POST   | `/consulta/checkin/{codigo}`              | Realizar check-in                   |

---

## 🔁 Integração com ms-paciente

- Ao agendar uma consulta, pontos são **debitados** via `usar-pontos`
- Ao cancelar uma consulta (status `CRIADO` ou `CHECK_IN`), pontos são **devolvidos** via `cancelar-pontos`

---

## 🧯 Parar os containers

```bash
docker compose down
```

---

## 📝 Licença

Este projeto é parte do sistema hospitalar acadêmico da UFPR. Uso educacional.
