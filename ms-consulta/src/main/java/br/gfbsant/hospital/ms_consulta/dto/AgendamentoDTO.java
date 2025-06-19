package br.gfbsant.hospital.ms_consulta.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AgendamentoDTO {
    private String pacienteId;
    private String codigoConsulta;
    private Integer pontosUtilizados;
    private BigDecimal valorPago;

    public AgendamentoDTO() {
    }

    public Integer getPontosUtilizados() {
        return pontosUtilizados;
    }

    public void setPontosUtilizados(Integer pontosUtilizados) {
        this.pontosUtilizados = pontosUtilizados;
    }

    public BigDecimal getValorPago() {
        return valorPago;
    }

    public void setValorPago(BigDecimal valorPago) {
        this.valorPago = valorPago;
    }

    public String getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(String pacienteId) {
        this.pacienteId = pacienteId;
    }

    public String getCodigoConsulta() {
        return codigoConsulta;
    }

    public void setCodigoConsulta(String codigoConsulta) {
        this.codigoConsulta = codigoConsulta;
    }
}
