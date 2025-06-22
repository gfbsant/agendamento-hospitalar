package br.gfbsant.hospital.ms_consulta.dto;

import br.gfbsant.hospital.ms_consulta.enums.StatusConsulta;

import java.time.LocalDateTime;
import java.util.List;

public class ConsultaComAgendamentosDTO {
    private String codigo;
    private LocalDateTime dataHora;
    private String medico;
    private String especialidade;
    private StatusConsulta status;
    private List<AgendamentoConsultaDTO> agendamentos;

    public ConsultaComAgendamentosDTO() {
    }

    public ConsultaComAgendamentosDTO(String codigo, LocalDateTime dataHora, String medico, String especialidade, StatusConsulta status, List<AgendamentoConsultaDTO> agendamentos) {
        this.codigo = codigo;
        this.dataHora = dataHora;
        this.medico = medico;
        this.especialidade = especialidade;
        this.status = status;
        this.agendamentos = agendamentos;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getMedico() {
        return medico;
    }

    public void setMedico(String medico) {
        this.medico = medico;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public StatusConsulta getStatus() {
        return status;
    }

    public void setStatus(StatusConsulta status) {
        this.status = status;
    }

    public List<AgendamentoConsultaDTO> getAgendamentos() {
        return agendamentos;
    }

    public void setAgendamentos(List<AgendamentoConsultaDTO> agendamentos) {
        this.agendamentos = agendamentos;
    }
}
