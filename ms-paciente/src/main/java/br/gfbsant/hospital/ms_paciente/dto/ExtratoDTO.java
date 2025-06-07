package br.gfbsant.hospital.ms_paciente.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ExtratoDTO {
    private String tipo;
    private String descricao;
    private LocalDateTime data;
    private Integer pontos;
    private BigDecimal valorEmReais;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public Integer getPontos() {
        return pontos;
    }

    public void setPontos(Integer pontos) {
        this.pontos = pontos;
    }

    public BigDecimal getValorEmReais() {
        return valorEmReais;
    }

    public void setValorEmReais(BigDecimal valorEmReais) {
        this.valorEmReais = valorEmReais;
    }
}
