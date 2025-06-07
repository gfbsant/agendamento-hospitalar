package br.gfbsant.hospital.ms_paciente.config;

import br.gfbsant.hospital.ms_paciente.exception.PacienteJaExisteException;
import br.gfbsant.hospital.ms_paciente.exception.PacienteNaoEncontradoException;
import br.gfbsant.hospital.ms_paciente.exception.SaldoInsuficienteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(PacienteNaoEncontradoException.class)
    public ResponseEntity<?> handleNaoEncontrado(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(getErrorMap(ex));
    }

    @ExceptionHandler(PacienteJaExisteException.class)
    public ResponseEntity<?> handleJaExiste(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(getErrorMap(ex));
    }

    @ExceptionHandler(SaldoInsuficienteException.class)
    public ResponseEntity<?> handleSemSaldo(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(getErrorMap(ex));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidacao(MethodArgumentNotValidException ex) {
        var erros = ex.getBindingResult().getFieldErrors().stream().map(
                erro -> Map.of("campo", erro.getField(),
                        "mensagem", erro.getDefaultMessage())
        ).toList();
        return ResponseEntity.badRequest().body(Map.of("erros", erros));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleErroGeral(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("erro", "Erro interno no servidor"));
    }

    private Map<String, String> getErrorMap(RuntimeException errMessage) {
        return Map.of("erro", errMessage.toString());
    }
}
