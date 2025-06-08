package br.gfbsant.hospital.ms_paciente.controller;

import br.gfbsant.hospital.ms_paciente.dto.CompraPontosDTO;
import br.gfbsant.hospital.ms_paciente.dto.PacienteDTO;
import br.gfbsant.hospital.ms_paciente.dto.UsoPontosDTO;
import br.gfbsant.hospital.ms_paciente.exception.PacienteJaExisteException;
import br.gfbsant.hospital.ms_paciente.exception.SaldoInsuficienteException;
import br.gfbsant.hospital.ms_paciente.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarPaciente(@RequestBody @Valid PacienteDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.registrar(dto));
        } catch (PacienteJaExisteException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/comprar-pontos")
    public ResponseEntity<?> comprarPontos(@RequestBody CompraPontosDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.comprarPontos(dto));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/usar-pontos")
    public ResponseEntity<?> usarPontos(@RequestBody UsoPontosDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.usarPontos(dto));
        } catch (SaldoInsuficienteException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/cancelar-pontos")
    public ResponseEntity<?> cancelarUsoDePontos(@RequestBody UsoPontosDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.cancelarUso(dto));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }

    @GetMapping("/extrato")
    public ResponseEntity<?> extrato(@RequestParam String cpf) {
        try {
            return ResponseEntity.ok(pacienteService.consultarExtrato(cpf));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }
}
