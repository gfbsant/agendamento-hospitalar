package ufpr.br.hospital.ms_auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import ufpr.br.hospital.ms_auth.dto.UsuarioDTO;
import ufpr.br.hospital.ms_auth.entity.Usuario;
import ufpr.br.hospital.ms_auth.exception.DuplicateResourceException;
import ufpr.br.hospital.ms_auth.repository.UsuarioRepository;

import java.util.Random;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository reposUsuario;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public String cadastrarUsuario (UsuarioDTO usuarioDTO, boolean autoRegistro) {
        if (reposUsuario.findByEmail(usuarioDTO.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email já cadastrado");
        }
        if (reposUsuario.findByCpf(usuarioDTO.getCpf()).isPresent()) {
            throw new DuplicateResourceException("CPF já cadastrado");
        }
        if (!usuarioDTO.getTipo().equals("PACIENTE") && !usuarioDTO.getTipo().equals("FUNCIONARIO")) {
            throw new IllegalArgumentException("Tipo de usuário inválido");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setCpf(usuarioDTO.getCpf());
        usuario.setTipo(usuarioDTO.getTipo());

        String senha;
        if (autoRegistro) {
            senha = gerarSenhaAleatoria();
            emailService.enviarSenhaInicial(usuario.getEmail(), senha);
        } else {
            senha = usuarioDTO.getSenha();
        }
        usuario.setSenha(passwordEncoder.encode(senha));
        usuarioRepository.save(usuario);
        return autoRegistro ? senha : usuarioDTO.getSenha();
    }

    private String gerarSenhaAleatoria() {
        Random random = new Random();
        StringBuilder senha = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            senha.append(random.nextInt(10));
        }
        return senha.toString();
    }
}
