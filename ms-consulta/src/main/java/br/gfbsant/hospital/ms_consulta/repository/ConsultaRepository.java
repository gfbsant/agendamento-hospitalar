package br.gfbsant.hospital.ms_consulta.repository;

import br.gfbsant.hospital.ms_consulta.entity.Consulta;
import br.gfbsant.hospital.ms_consulta.enums.StatusConsulta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    Optional<Consulta> findByCodigo(String codigo);
    List<Consulta> findByStatus(StatusConsulta status);
}
