package br.gfbsant.hospital.ms_paciente.exception;

public class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException() {
        super("Saldo de pontos insuficiente!");
    }
}
