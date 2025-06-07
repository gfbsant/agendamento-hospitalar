package br.gfbsant.hospital.ms_paciente.repository;

import br.gfbsant.hospital.ms_paciente.entity.TransacaoPontos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransacaoPontosRepository extends JpaRepository<TransacaoPontos, Long> {
    List<TransacaoPontos> findByPaciente_Cpf(String pacienteCpf);
}
