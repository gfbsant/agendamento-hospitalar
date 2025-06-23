package br.gfbsant.hospital.ms_consulta.dto;

import br.gfbsant.hospital.ms_consulta.enums.StatusAgendamento;

public class AgendamentoConsultaDTO {
    private String codigo;
    private String pacienteId;
    private StatusAgendamento status;
    private Integer pontosUtilizados;

    public AgendamentoConsultaDTO() {
    }

    public AgendamentoConsultaDTO(String codigo, String pacienteId, StatusAgendamento status, Integer pontosUtilizados) {
        this.codigo = codigo;
        this.pacienteId = pacienteId;
        this.status = status;
        this.pontosUtilizados = pontosUtilizados;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(String pacienteId) {
        this.pacienteId = pacienteId;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }

    public Integer getPontosUtilizados() {
        return pontosUtilizados;
    }

    public void setPontosUtilizados(Integer pontosUtilizados) {
        this.pontosUtilizados = pontosUtilizados;
    }
}
