package br.gfbsant.hospital.ms_consulta.dto;

import br.gfbsant.hospital.ms_consulta.enums.StatusAgendamento;

import java.time.LocalDateTime;

public class AgendamentoResumoDTO {
    private String codigo;
    private StatusAgendamento status;
    private LocalDateTime dataHora;
    private String medico;
    private String especialidade;

    public AgendamentoResumoDTO() {
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
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
}
