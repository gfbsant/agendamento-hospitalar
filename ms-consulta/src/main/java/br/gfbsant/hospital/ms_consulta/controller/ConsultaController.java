package br.gfbsant.hospital.ms_consulta.controller;

import br.gfbsant.hospital.ms_consulta.dto.AgendamentoDTO;
import br.gfbsant.hospital.ms_consulta.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @GetMapping("/disponiveis")
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(consultaService.listarDisponiveis());
    }

    @PostMapping("/agendar")
    public ResponseEntity<?> agendar(@RequestBody AgendamentoDTO dto) {
        String codigo = consultaService.agendarConsulta(dto);
        return ResponseEntity.ok(Map.of("codigo", codigo));
    }

    @GetMapping("/agendamentos")
    public ResponseEntity<?> porPaciente(@RequestParam String cpf) {
        return ResponseEntity.ok(consultaService.listarPorPaciente(cpf));
    }

    @PostMapping("/cancelar/{codigo}")
    public ResponseEntity<?> cancelar(@PathVariable String codigo) {
        consultaService.cancelar(codigo);
        return ResponseEntity.ok(Map.of("msg", "Consulta cancelada com sucesso!"));
    }

    @PostMapping("/checkin/{codigo}")
    public ResponseEntity<?> checkIn(@PathVariable String codigo) {
        consultaService.checkIn(codigo);
        return ResponseEntity.ok(Map.of("msg", "Check-in realizado com sucesso!"));
    }
}
