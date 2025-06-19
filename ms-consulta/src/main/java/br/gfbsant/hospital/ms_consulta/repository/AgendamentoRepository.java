package br.gfbsant.hospital.ms_consulta.repository;

import br.gfbsant.hospital.ms_consulta.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    Optional<Agendamento> findByCodigo(String codigo);
    List<Agendamento> findByPacienteId(String pacienteId);
}
