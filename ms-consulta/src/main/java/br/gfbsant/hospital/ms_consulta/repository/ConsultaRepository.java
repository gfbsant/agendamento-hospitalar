package br.gfbsant.hospital.ms_consulta.repository;

import br.gfbsant.hospital.ms_consulta.entity.Consulta;
import br.gfbsant.hospital.ms_consulta.enums.StatusConsulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    Optional<Consulta> findByCodigo(String codigo);

    List<Consulta> findByStatus(StatusConsulta status);

    @Query("SELECT c FROM Consulta c WHERE c.dataHora BETWEEN :inicio and :fim")
    List<Consulta> findProximas(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
}
