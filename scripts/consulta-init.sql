CREATE TABLE consultas
(
    id            SERIAL PRIMARY KEY,
    codigo        VARCHAR(20) UNIQUE,
    data_hora     TIMESTAMP,
    especialidade VARCHAR(50),
    medico        VARCHAR(100),
    valor         NUMERIC(10, 2),
    vagas         INTEGER,
    status        VARCHAR(20)
);

CREATE TABLE agendamentos
(
    id                SERIAL PRIMARY KEY,
    codigo            VARCHAR(20) UNIQUE,
    paciente_id       INTEGER,
    consulta_id       INTEGER REFERENCES consultas (id),
    status            VARCHAR(20),
    pontos_utilizados INTEGER,
    valor_pago        NUMERIC(10, 2),
    check_in          BOOLEAN DEFAULT FALSE
);

CREATE TABLE funcionarios
(
    id       SERIAL PRIMARY KEY,
    ativo    BOOLEAN NOT NULL,
    cpf      VARCHAR(15) UNIQUE,
    email    VARCHAR(60) UNIQUE,
    nome     VARCHAR(255) UNIQUE,
    telefone VARCHAR(15)
);

INSERT INTO consultas (codigo, data_hora, especialidade, medico, valor, vagas, status)
VALUES ('CON001', (CURRENT_DATE + INTERVAL '1 day') + TIME '10:30', 'CARD', 'Dr. Paulo', 300.00, 5, 'DISPONIVEL'),
       ('CON002', (CURRENT_DATE + INTERVAL '1 day') + TIME '09:30', 'PED', 'Dra. Lúcia', 250.00, 4, 'DISPONIVEL'),
       ('CON003', (CURRENT_DATE + INTERVAL '1 day') + TIME '08:30', 'DERM', 'Dr. Carlos', 200.00, 3, 'DISPONIVEL');

INSERT INTO funcionarios (ativo, cpf, email, nome, telefone)
VALUES (true, '23456789012', 'dr.paulo@hospital.com', 'Paulo Cardoso', '41999990001')