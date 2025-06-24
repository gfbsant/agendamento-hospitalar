package br.gfbsant.hospital.ms_auth.controller;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import br.gfbsant.hospital.ms_auth.dto.LoginDTO;
import br.gfbsant.hospital.ms_auth.dto.UsuarioDTO;
import br.gfbsant.hospital.ms_auth.entity.Usuario;
import br.gfbsant.hospital.ms_auth.exception.DuplicateResourceException;
import br.gfbsant.hospital.ms_auth.repository.UsuarioRepository;
import br.gfbsant.hospital.ms_auth.security.JwtService;
import br.gfbsant.hospital.ms_auth.service.UsuarioService;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
public class AuthController {

    private static final Log LOG = LogFactory.getLog(AuthController.class);

    @Autowired
    private UsuarioRepository reposUsuario;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioService serviceUsuario;


    @PostMapping("/registro-paciente")
    public ResponseEntity<?> registroPaciente(@RequestBody UsuarioDTO usuarioDTO) {
        if (!Objects.equals(usuarioDTO.getTipo(), "PACIENTE")) {
            return ResponseEntity.badRequest().body("Tipo de usuario não permitido.");
        }
        return cadastrarUsuario(usuarioDTO);
    }

    @PostMapping("/registro-funcionario")
    public ResponseEntity<?> registroFuncionarios(@RequestBody UsuarioDTO usuarioDTO) {
        if (!Objects.equals(usuarioDTO.getTipo(), "FUNCIONARIO")) {
            return ResponseEntity.badRequest().body("Tipo de usuario não permitido.");
        }
        return cadastrarUsuario(usuarioDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        LOG.info("Iniciando o login");
        Usuario usuario = reposUsuario.findByEmail(loginDTO.getEmail())
                .orElse(null);
        if (usuario == null || !passwordEncoder.matches(loginDTO.getSenha(), usuario.getSenha())) {
            LOG.info("Email ou senha inválidos");
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
        LOG.info("Usuario logado com sucesso");
        String token = jwtService.gerarToken(usuario);
        LOG.info("Token gerado: " + token);
        return ResponseEntity.ok(Map.of("token", token));
    }

    private ResponseEntity<?> cadastrarUsuario(UsuarioDTO usuarioDTO) {
        try {
            LOG.info("Iniciando o registro do usuário: " + usuarioDTO.getEmail());
            serviceUsuario.cadastrarUsuario(usuarioDTO);
            LOG.info("Usuário cadastrado com sucesso: " + usuarioDTO.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioDTO);
        } catch (DuplicateResourceException e) {
            LOG.warn("Erro ao cadastrar usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            LOG.error("Erro ao cadastrar usuário: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao cadastrar usuário");
        }
    }

    @DeleteMapping("/usuario")
    public ResponseEntity<?> deletarUsuarioPorEmail(@RequestParam String email) {
        Optional<Usuario> usuario = reposUsuario.findByEmail(email);
        if (usuario.isPresent()) {
            reposUsuario.delete(usuario.get());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuario deletado com sucesso");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado");
    }


    @GetMapping("/existe")
    public ResponseEntity<?> verificarExistencia(@RequestParam(required = false) String email,
                                                 @RequestParam(required = false) String cpf) {
        boolean existeEmail = email != null && reposUsuario.findByEmail(email).isPresent();
        boolean existeCpf = cpf != null && reposUsuario.findByCpf(cpf).isPresent();
        return ResponseEntity.ok(Map.of("email", existeEmail, "cpf", existeCpf));
    }

    @PutMapping("/atualizar-email/{cpf}")
    public ResponseEntity<?> atualizarEmail(@PathVariable String cpf, @RequestBody String novoEmail) {
        Optional<Usuario> optionalUsuario = reposUsuario.findByCpf(cpf);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            usuario.setEmail(novoEmail);
            reposUsuario.save(usuario);
            return ResponseEntity.ok(Map.of("msg", "Sucesso!"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado");
    }

}
