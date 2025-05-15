package ufpr.br.hospital.ms_auth.controller;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ufpr.br.hospital.ms_auth.dto.LoginDTO;
import ufpr.br.hospital.ms_auth.dto.UsuarioDTO;
import ufpr.br.hospital.ms_auth.entity.Usuario;
import ufpr.br.hospital.ms_auth.exception.DuplicateResourceException;
import ufpr.br.hospital.ms_auth.repository.UsuarioRepository;
import ufpr.br.hospital.ms_auth.security.JwtService;
import ufpr.br.hospital.ms_auth.service.UsuarioService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
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


    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody UsuarioDTO usuarioDTO) {
        return cadastrarUsuario(usuarioDTO, false);
    }

    @PostMapping("/auto-registro")
    public ResponseEntity<?> autoRegistro(@RequestBody UsuarioDTO usuarioDTO) {
        return cadastrarUsuario(usuarioDTO, true);
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

    private ResponseEntity<?> cadastrarUsuario(UsuarioDTO usuarioDTO, boolean autoRegistro) {
        try {
            LOG.info("Iniciando o registro do usuário: " + usuarioDTO.getEmail());
            String senha = serviceUsuario.cadastrarUsuario(usuarioDTO, autoRegistro);
            if (autoRegistro) {
                usuarioDTO.setSenha(senha);
            }
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


}
