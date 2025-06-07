package br.gfbsant.hospital.ms_paciente.exception;

public class PacienteJaExisteException extends RuntimeException {
    public PacienteJaExisteException(String cpf) {
        super("Ja existe um paciente com o CPF " + cpf);
    }
}
