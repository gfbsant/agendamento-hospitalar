package br.gfbsant.hospital.ms_consulta.controller;

import br.gfbsant.hospital.ms_consulta.dto.AgendamentoDTO;
import br.gfbsant.hospital.ms_consulta.dto.NovaConsultaDTO;
import br.gfbsant.hospital.ms_consulta.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @PostMapping
    ResponseEntity<?> cadastrar(@RequestBody NovaConsultaDTO dto) {
        try {
            consultaService.cadastrarConsulta(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of("msg", "Consulta criada"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(consultaService.listarDisponiveis());
    }

    @GetMapping("/filtrar")
    public ResponseEntity<?> filtrarConsultas(@RequestParam String filtro) {
        if (filtro == null || filtro.isBlank()) {
            return ResponseEntity.badRequest().body("Necessario informar medico ou especialidade");
        }
        return ResponseEntity.ok(consultaService.filtrarConsultas(filtro));
    }

    @PostMapping("/agendar")
    public ResponseEntity<?> agendar(@RequestBody AgendamentoDTO dto) {
        String codigo = consultaService.agendarConsulta(dto);
        return ResponseEntity.ok(Map.of("codigo", codigo));
    }

    @GetMapping("/agendamentos-paciente")
    public ResponseEntity<?> porPaciente(@RequestParam String cpf) {
        return ResponseEntity.ok(consultaService.listarAgendamentosPorPaciente(cpf));
    }

    @PostMapping("/cancelar-agendamento/{codigo}")
    public ResponseEntity<?> cancelarAgendamento(@PathVariable String codigo) {
        consultaService.cancelarAgendamento(codigo);
        return ResponseEntity.ok(Map.of("msg", "Consulta cancelada com sucesso!"));
    }

    @PostMapping("/check-in/{codigo}")
    public ResponseEntity<?> checkIn(@PathVariable String codigo) {
        consultaService.checkInAgendamento(codigo);
        return ResponseEntity.ok(Map.of("msg", "Check-in realizado com sucesso!"));
    }

    @GetMapping("/proximas-48h")
    public ResponseEntity<?> proximas48h() {
        return ResponseEntity.ok(consultaService.listarProximas48h());
    }

    @PostMapping("/realizar-consulta/{codigo}")
    public ResponseEntity<?> realizar(@PathVariable String codigo) {
        String errMessage;
        try {
            consultaService.realizarConsulta(codigo);
            return ResponseEntity.ok(Map.of("msg", "Consulta realizada"));
        } catch (Exception e) {
            errMessage = e.getMessage();
        }
        return ResponseEntity.badRequest().body(Map.of("msg", errMessage));
    }

    @PostMapping("/cancelar-consulta/{codigo}")
    public ResponseEntity<?> cancelarConsulta(@PathVariable String codigo) {
        String errMessage;
        try {
            consultaService.cancelarConsulta(codigo);
            return ResponseEntity.ok(Map.of("msg", "Consulta cancelada"));
        } catch (Exception e) {
            errMessage = e.getMessage();
        }
        return ResponseEntity.badRequest().body(Map.of("msg", errMessage));
    }

    @PostMapping("/confirmar-comparecimento/{codigo}")
    public ResponseEntity<?> confirmarComparecimento(@PathVariable String codigo) {
        String errMessage;
        try {
            consultaService.confirmarComparecimento(codigo);
            return ResponseEntity.ok(Map.of("msg", "Consulta confirmada"));
        } catch (Exception e) {
            errMessage = e.getMessage();
        }
        return ResponseEntity.badRequest().body(Map.of("msg", errMessage));
    }


}
