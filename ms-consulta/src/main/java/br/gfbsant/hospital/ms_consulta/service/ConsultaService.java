package br.gfbsant.hospital.ms_consulta.service;

import br.gfbsant.hospital.ms_consulta.dto.AgendamentoDTO;
import br.gfbsant.hospital.ms_consulta.dto.AgendamentoResumoDTO;
import br.gfbsant.hospital.ms_consulta.dto.ConsultaDTO;
import br.gfbsant.hospital.ms_consulta.dto.NovaConsultaDTO;
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

    public List<AgendamentoResumoDTO> listarAgendamentosPorPaciente(String pacienteId) {
        return agendamentoRepository.findByPacienteId(pacienteId).stream().map(agendamento -> {
            AgendamentoResumoDTO dto = new AgendamentoResumoDTO();
            dto.setCodigo(agendamento.getCodigo());
            dto.setEspecialidade(agendamento.getConsulta().getEspecialidade());
            dto.setDataHora(agendamento.getConsulta().getDataHora());
            dto.setMedico(agendamento.getConsulta().getMedico());
            dto.setStatus(agendamento.getStatus());
            return dto;
        }).toList();
    }

    public void cancelarAgendamento(String codigo) {
        Agendamento agendamento = agendamentoRepository.findByCodigo(codigo).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        if (agendamento.getStatus() == StatusAgendamento.CRIADO || agendamento.getStatus() == StatusAgendamento.CHECK_IN) {
            agendamento.setStatus(StatusAgendamento.CANCELADO);
            agendamentoRepository.save(agendamento);

            Consulta consulta = agendamento.getConsulta();
            consulta.setVagas(consulta.getVagas() + 1);
            consultaRepository.save(consulta);
        } else {
            throw new IllegalStateException("Consulta não pode ser cancelada!");
        }
    }

    public void checkInAgendamento(String codigo) {
        Agendamento agendamento = agendamentoRepository.findByCodigo(codigo).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        if (ChronoUnit.HOURS.between(LocalDateTime.now(), agendamento.getConsulta().getDataHora()) <= 48 &&
                agendamento.getStatus() == StatusAgendamento.CRIADO) {
            agendamento.setStatus(StatusAgendamento.CHECK_IN);
            agendamento.setCheckIn(true);
            agendamentoRepository.save(agendamento);
        } else {
            throw new IllegalStateException("Check-in não permitido");
        }
    }

    public List<Consulta> listarProximas48h() {
        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime fim = agora.plusHours(48);
        return consultaRepository.findProximas(agora, fim);
    }

    public void confirmarComparecimento(String codigoAgendamento) {
        Agendamento agendamento = agendamentoRepository.findByCodigo(codigoAgendamento).orElseThrow(
                () -> new RuntimeException("Agendamento não encontrado"));

        if (!StatusAgendamento.CHECK_IN.equals(agendamento.getStatus())) {
            throw new RuntimeException("Agendamento não está apto para confirmação");
        }

        agendamento.setStatus(StatusAgendamento.COMPARECEU);
        agendamentoRepository.save(agendamento);
    }

    public void cancelarConsulta(String codigoConsulta) {
        Consulta consulta = consultaRepository.findByCodigo(codigoConsulta).orElseThrow(
                () -> new RuntimeException("Consulta não encotnrada"));

        List<Agendamento> agendamentos = agendamentoRepository.findByConsulta(consulta);
        long confirmados = agendamentos.stream().filter(agendamento ->
                StatusAgendamento.COMPARECEU.equals(agendamento.getStatus())).count();

        if (confirmados >= (consulta.getVagas() / 2)) {
            throw new RuntimeException("Mais de 50% confirmados. Não é possivel cancelar!");
        }

        consulta.setStatus(StatusConsulta.CANCELADA);
        consultaRepository.save(consulta);

        for (Agendamento agendamento : agendamentos) {
            agendamento.setStatus(StatusAgendamento.CANCELADO);
            agendamentoRepository.save(agendamento);
        }
    }

    public void realizarConsulta(String consultaCodigo) {
        Consulta consulta = consultaRepository.findByCodigo(consultaCodigo).orElseThrow(
                () -> new RuntimeException("Consulta não localizada"));
        List<Agendamento> agendamentos = agendamentoRepository.findByConsulta(consulta);
        for (Agendamento agendamento : agendamentos) {
            if (StatusAgendamento.COMPARECEU.equals(agendamento.getStatus())) {
                agendamento.setStatus(StatusAgendamento.REALIZADO);
            } else {
                agendamento.setStatus(StatusAgendamento.FALTOU);
            }
            agendamentoRepository.save(agendamento);
        }
        consulta.setStatus(StatusConsulta.REALIZADA);
        consultaRepository.save(consulta);
    }

    public void cadastrarConsulta(NovaConsultaDTO dto) {
        Consulta novaConsulta = new Consulta();
        novaConsulta.setCodigo(UUID.randomUUID().toString().substring(0, 8));
        novaConsulta.setDataHora(dto.getDataHora());
        novaConsulta.setEspecialidade(dto.getEspecialidade());
        novaConsulta.setMedico(dto.getMedico());
        novaConsulta.setValor(dto.getValor());
        novaConsulta.setVagas(dto.getVagas());
        novaConsulta.setStatus(StatusConsulta.DISPONIVEL);
        consultaRepository.save(novaConsulta);
    }
}
