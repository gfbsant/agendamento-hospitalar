package br.gfbsant.hospital.ms_paciente.controller;

import br.gfbsant.hospital.ms_paciente.dto.CompraPontosDTO;
import br.gfbsant.hospital.ms_paciente.dto.PacienteDTO;
import br.gfbsant.hospital.ms_paciente.dto.UsoPontosDTO;
import br.gfbsant.hospital.ms_paciente.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paciente")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarPaciente(@RequestBody @Valid PacienteDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.registrar(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/comprar-pontos")
    public ResponseEntity<?> comprarPontos(@RequestBody CompraPontosDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.comprarPontos(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/usar-pontos")
    public ResponseEntity<?> usarPontos(@RequestBody UsoPontosDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.usarPontos(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/cancelar-pontos")
    public ResponseEntity<?> cancelarUsoDePontos(@RequestBody UsoPontosDTO dto) {
        try {
            return ResponseEntity.ok(pacienteService.cancelarUso(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/extrato")
    public ResponseEntity<?> extrato(@RequestParam String cpf) {
        try {
            return ResponseEntity.ok(pacienteService.consultarExtrato(cpf));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
