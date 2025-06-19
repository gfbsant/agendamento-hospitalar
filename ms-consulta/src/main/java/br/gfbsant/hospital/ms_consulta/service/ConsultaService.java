package br.gfbsant.hospital.ms_consulta.service;

import br.gfbsant.hospital.ms_consulta.dto.AgendamentoDTO;
import br.gfbsant.hospital.ms_consulta.dto.AgendamentoResumoDTO;
import br.gfbsant.hospital.ms_consulta.dto.ConsultaDTO;
import br.gfbsant.hospital.ms_consulta.entity.Agendamento;
import br.gfbsant.hospital.ms_consulta.entity.Consulta;
import br.gfbsant.hospital.ms_consulta.enums.StatusAgendamento;
import br.gfbsant.hospital.ms_consulta.enums.StatusConsulta;
import br.gfbsant.hospital.ms_consulta.repository.AgendamentoRepository;
import br.gfbsant.hospital.ms_consulta.repository.ConsultaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<ConsultaDTO> listarDisponiveis() {
        return consultaRepository.findByStatus(StatusConsulta.DISPONIVEL).stream().map(consulta -> {
            ConsultaDTO dto = new ConsultaDTO();
            BeanUtils.copyProperties(consulta, dto);
            return dto;
        }).toList();
    }

    public String agendarConsulta(AgendamentoDTO dto) {
        Consulta consulta = consultaRepository.findByCodigo(dto.getCodigoConsulta()).orElseThrow(
                () -> new RuntimeException("Consulta não encontrada.")
        );
        if (!StatusConsulta.DISPONIVEL.equals(consulta.getStatus()) || consulta.getVagas() < 1) {
            throw new RuntimeException("Consulta não disponivel");
        }
        consulta.setVagas(consulta.getVagas() - 1);
        consultaRepository.save(consulta);
        Agendamento agendamento = new Agendamento();
        agendamento.setCodigo(UUID.randomUUID().toString().substring(0, 8));
        agendamento.setConsulta(consulta);
        agendamento.setPacienteId(dto.getPacienteId());
        agendamento.setPontosUtilizados(dto.getPontosUtilizados());
        agendamento.setValorPago(dto.getValorPago());
        agendamento.setStatus(StatusAgendamento.CRIADO);
        agendamentoRepository.save(agendamento);
        return agendamento.getCodigo();
    }

    public List<AgendamentoResumoDTO> listarPorPaciente(String pacienteId) {
        return agendamentoRepository.findByPacienteId(pacienteId).stream().map(agendamento -> {
            AgendamentoResumoDTO dto = new AgendamentoResumoDTO();
            dto.setCodigo(agendamento.getCodigo());
            dto.setEspecialidade(agendamento.getConsulta().getEspecialidade());
            dto.setDataHora(agendamento.getConsulta().getDataHora());
            dto.setStatus(agendamento.getStatus());
            return dto;
        }).toList();
    }

    public void cancelar(String codigo) {
        Agendamento agendamento = agendamentoRepository.findByCodigo(codigo).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        if (agendamento.getStatus() == StatusAgendamento.CRIADO || agendamento.getStatus() == StatusAgendamento.CHECH_IN) {
            agendamento.setStatus(StatusAgendamento.CANCELADO);
            agendamentoRepository.save(agendamento);

            Consulta consulta = agendamento.getConsulta();
            consulta.setVagas(consulta.getVagas() + 1);
            consultaRepository.save(consulta);
        } else {
            throw new IllegalStateException("Consulta não pode ser cancelada!");
        }
    }

    public void checkIn(String codigo) {
        Agendamento agendamento = agendamentoRepository.findByCodigo(codigo).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        if (ChronoUnit.HOURS.between(LocalDateTime.now(), agendamento.getConsulta().getDataHora()) <= 48 &&
                agendamento.getStatus() == StatusAgendamento.CRIADO) {
            agendamento.setStatus(StatusAgendamento.CHECH_IN);
            agendamento.setCheckIn(true);
            agendamentoRepository.save(agendamento);
        } else {
            throw new IllegalStateException("Check-in não permitido");
        }
    }
}
