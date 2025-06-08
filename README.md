# Projeto Hospital - Sistema Distribuído com Microsserviços

Este projeto representa um sistema hospitalar baseado em microsserviços, utilizando Spring Boot, Angular, API Gateway e PostgreSQL. O sistema permite autenticação, agendamento de consultas e controle de pacientes.

---

## 🧱 Estrutura do Projeto

```
.
├── docker-compose.yml
├── api-gateway/         → Node.js Gateway para os microsserviços
├── frontend/            → Aplicação Angular (usuário)
├── ms-auth/             → Microsserviço de autenticação e geração de JWT
├── ms-paciente/         → Microsserviço para cadastro de pacientes e sistema de pontos
├── ms-consulta/         → Microsserviço para agendamento e gerenciamento de consultas
├── scripts/             → Scripts SQL de inicialização de banco
```

---

## 🚀 Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)
- Java 21 (para builds locais dos microsserviços)
- Node.js 18+ e Angular CLI (caso deseje rodar o front-end separadamente)

---
# Configuração de Variáveis de Ambiente (.env)

É necessário criar um arquivo `.env` na raiz do projeto com as seguintes configurações:

```
MAIL_USERNAME=seu_email@exemplo.com
MAIL_PASSWORD=sua_senha_de_email
JWT_SECRET=uma_chave_secreta_para_tokens
```

## ⚙️ Detalhes das variáveis

| Variável | Descrição |
|----------|-----------|
| MAIL_USERNAME | Email utilizado para envio de notificações |
| MAIL_PASSWORD | Senha do email ou senha de aplicativo (recomendado) |
| JWT_SECRET | Chave secreta para assinar os tokens JWT de autenticação |

## 📋 Observações importantes

- O arquivo `.env` deve ser criado na raiz do projeto, no mesmo nível do `docker-compose.yml`
- Este arquivo **não deve** ser adicionado ao controle de versão por motivos de segurança
- Para serviços Gmail, recomenda-se usar "senhas de aplicativo" em vez da senha principal
- A variável JWT_SECRET deve ser uma string forte e aleatória

Os contêineres Docker irão carregar automaticamente essas variáveis de ambiente durante a inicialização.

## ▶️ Subindo o sistema

### 1. Compilar os microsserviços (opcional)

Se quiser compilar manualmente:

```bash
cd ms-auth
./mvnw clean package -DskipTests

cd ../ms-paciente
./mvnw clean package -DskipTests

cd ../ms-consulta
./mvnw clean package -DskipTests
```

### 2. Subir tudo com Docker Compose

Na raiz do projeto:

```bash
docker compose up --build
```

---

## 🌐 Endpoints principais (via API Gateway)

| Microsserviço   | URL Base                       |
|-----------------|--------------------------------|
| Auth            | `http://localhost:8080/auth`   |
| Paciente        | `http://localhost:8080/paciente` |
| Consulta        | `http://localhost:8080/consulta` |
| Frontend        | `http://localhost:4200`        |

---

## 📦 Scripts SQL

Os bancos de dados são inicializados com os scripts da pasta `scripts/`:

- `auth-init.sql`
- `paciente-init.sql`
- `consulta-init.sql`

Eles são executados automaticamente na primeira execução do Docker Compose.

---

## 🧪 Testes com Postman / curl

Consulte os `README.md` individuais dentro de cada microsserviço para ver os exemplos de uso e testes.

---

## 🧯 Encerrar o sistema

```bash
docker compose down
```

---

## 📝 Licença

Sistema acadêmico para fins educacionais.
