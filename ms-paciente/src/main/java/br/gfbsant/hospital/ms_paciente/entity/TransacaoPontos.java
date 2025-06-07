package br.gfbsant.hospital.ms_paciente.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class TransacaoPontos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Paciente paciente;

    private LocalDateTime data = LocalDateTime.now();

    private String tipo;

    private String descricao;

    private BigDecimal valorEmReais;

    private Integer pontos;

    public TransacaoPontos(Paciente paciente, String tipo, String descricao, BigDecimal valor, Integer pontos) {
        this.paciente = paciente;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valorEmReais = valor;
        this.pontos = pontos;
        this.data = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

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

    public BigDecimal getValorEmReais() {
        return valorEmReais;
    }

    public void setValorEmReais(BigDecimal valorEmReais) {
        this.valorEmReais = valorEmReais;
    }

    public Integer getPontos() {
        return pontos;
    }

    public void setPontos(Integer pontos) {
        this.pontos = pontos;
    }
}
