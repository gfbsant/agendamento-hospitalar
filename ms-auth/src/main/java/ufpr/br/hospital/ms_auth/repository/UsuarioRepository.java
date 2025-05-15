package ufpr.br.hospital.ms_auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ufpr.br.hospital.ms_auth.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByCpf(String cpf);
}
