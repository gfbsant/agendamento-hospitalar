package br.gfbsant.hospital.ms_consulta.controller;

import br.gfbsant.hospital.ms_consulta.dto.FuncionarioDTO;
import br.gfbsant.hospital.ms_consulta.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody FuncionarioDTO dto) {
        try {
            funcionarioService.criar(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of("msg", "Funcionario criado com sucesso!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("msg", e.getMessage()));
        }
    }
 
    @PutMapping("/{cpf}")
    public ResponseEntity<?> atualizar(@PathVariable String cpf, @RequestBody FuncionarioDTO dto) {
        try {
            funcionarioService.atualizar(cpf, dto);
            return ResponseEntity.ok().body(
                    Map.of("msg", "Usuario atualizado com sucesso!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("msg", e.getMessage()));
        }
    }

    @PatchMapping("/inativar/{cpf}")
    public ResponseEntity<?> inativar(@PathVariable String cpf) {
        try {
            funcionarioService.inativar(cpf);
            return ResponseEntity.ok().body(Map.of("msg", "Funcionario inativado com sucesso."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("msg", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("msg", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(funcionarioService.listarFuncionarios());
    }

}
