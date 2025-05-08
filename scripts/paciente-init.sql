-- noinspection SqlNoDataSourceInspectionForFile

CREATE TABLE pacientes (
                           id SERIAL PRIMARY KEY,
                           nome VARCHAR(100),
                           cpf VARCHAR(11) UNIQUE,
                           email VARCHAR(100) UNIQUE,
                           cep VARCHAR(9),
                           endereco VARCHAR(200),
                           pontos INTEGER DEFAULT 0
);

CREATE TABLE transacoes (
                            id SERIAL PRIMARY KEY,
                            paciente_id INTEGER REFERENCES pacientes(id),
                            data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            tipo VARCHAR(10),
                            descricao VARCHAR(100),
                            valor_em_reais NUMERIC(10,2),
                            pontos INTEGER
);

INSERT INTO pacientes (nome, cpf, email, cep, endereco, pontos)
VALUES ('Maria da Silva', '12345678900', 'maria.silva@teste.com', '80000-000', 'Rua A, 123 - Centro - Curitiba', 100);
