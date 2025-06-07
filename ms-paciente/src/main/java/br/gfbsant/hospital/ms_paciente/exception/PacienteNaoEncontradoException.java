package br.gfbsant.hospital.ms_paciente.exception;

public class PacienteNaoEncontradoException extends RuntimeException{
    public PacienteNaoEncontradoException(String cpf) {
        super("Paciente com CPF " + cpf + " nao encontrado.");
    }
}
