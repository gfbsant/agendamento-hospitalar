-- noinspection SqlNoDataSourceInspectionForFile

CREATE TABLE usuarios
(
    id    SERIAL PRIMARY KEY,
    nome  VARCHAR(100),
    cpf   VARCHAR(11) UNIQUE,
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(256),
    tipo  VARCHAR(20)
);

INSERT INTO usuarios (nome, cpf, email, senha, tipo)
VALUES ('Funcionario Padrao', '90769281001', 'func_pre@hospital.com',
        '$2a$10$5Y1I3wrjRTDXwxe9zwsBlORMe0JS4somguw54OacYtE5kG29Voswu', 'FUNCIONARIO');
