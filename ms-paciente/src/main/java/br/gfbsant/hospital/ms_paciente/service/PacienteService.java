package br.gfbsant.hospital.ms_paciente.service;

import br.gfbsant.hospital.ms_paciente.dto.CompraPontosDTO;
import br.gfbsant.hospital.ms_paciente.dto.ExtratoDTO;
import br.gfbsant.hospital.ms_paciente.dto.PacienteDTO;
import br.gfbsant.hospital.ms_paciente.dto.UsoPontosDTO;
import br.gfbsant.hospital.ms_paciente.entity.Paciente;
import br.gfbsant.hospital.ms_paciente.entity.TransacaoPontos;
import br.gfbsant.hospital.ms_paciente.exception.PacienteJaExisteException;
import br.gfbsant.hospital.ms_paciente.exception.PacienteNaoEncontradoException;
import br.gfbsant.hospital.ms_paciente.exception.SaldoInsuficienteException;
import br.gfbsant.hospital.ms_paciente.repository.PacienteRepository;
import br.gfbsant.hospital.ms_paciente.repository.TransacaoPontosRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepo;

    @Autowired
    private TransacaoPontosRepository transacaoRepo;

    @Autowired
    private ModelMapper mapper;

    public void registrar(PacienteDTO dto) {
        String cpf = dto.getCpf();
        if (pacienteRepo.findByCpf(cpf).isPresent()) {
            throw new PacienteJaExisteException(cpf);
        }

        Paciente paciente = mapper.map(dto, Paciente.class);
        paciente.setPontos(0);
        pacienteRepo.save(paciente);
    }

    public void comprarPontos(CompraPontosDTO dto) {
        Paciente paciente = getPacientePorCpf(dto.getCpf());
        paciente.setPontos(paciente.getPontos() + dto.getPontos());
        pacienteRepo.save(paciente);
        TransacaoPontos transacao = new TransacaoPontos(paciente, "ENTRADA", "Compra de pontos",
                dto.getValorReais(), dto.getPontos());
        transacaoRepo.save(transacao);
    }

    public void usarPontos(UsoPontosDTO dto) {
        Paciente paciente = getPacientePorCpf(dto.getCpf());
        if (paciente.getPontos() < dto.getPontos()) {
            throw new SaldoInsuficienteException();
        }
        paciente.setPontos(paciente.getPontos() - dto.getPontos());
        pacienteRepo.save(paciente);

        TransacaoPontos transacao = new TransacaoPontos(paciente, "SAIDA", dto.getDescricao(), BigDecimal.ZERO,
                dto.getPontos());
        transacaoRepo.save(transacao);
    }

    public void cancelarUso(UsoPontosDTO dto) {
        Paciente paciente = getPacientePorCpf(dto.getCpf());
        paciente.setPontos(paciente.getPontos() + dto.getPontos());
        pacienteRepo.save(paciente);
        TransacaoPontos transacao = new TransacaoPontos(paciente, "ENTRADA", dto.getDescricao() +
                " (Cancelamento)", BigDecimal.ZERO, dto.getPontos());
        transacaoRepo.save(transacao);
    }

    public Map<String, Object> consultarExtrato(String cpf) {
        Paciente paciente = getPacientePorCpf(cpf);
        List<TransacaoPontos> transacoes = transacaoRepo.findByPaciente_Cpf(cpf);
        List<ExtratoDTO> extrato = transacoes.stream().map(
                transacao -> {
                    ExtratoDTO dto = new ExtratoDTO();
                    dto.setTipo(transacao.getTipo());
                    dto.setDescricao(transacao.getDescricao());
                    dto.setData(transacao.getData());
                    dto.setPontos(transacao.getPontos());
                    dto.setValorEmReais(transacao.getValorEmReais());
                    return dto;
                }
        ).toList();
        return Map.of(
                "nome", paciente.getNome(),
                "cpf", paciente.getCpf(),
                "pontos", paciente.getPontos(),
                "extrato", extrato
        );
    }

    private Paciente getPacientePorCpf(String cpf) {
        return pacienteRepo.findByCpf(cpf).orElseThrow(() -> new PacienteNaoEncontradoException(cpf));
    }

    public PacienteDTO recuperarPerfil(String cpf) throws PacienteNaoEncontradoException {
        Paciente entity = getPacientePorCpf(cpf);
        return mapper.map(entity, PacienteDTO.class);
    }

    public Integer recuperarSaldo(String cpf) {
        Paciente entity = getPacientePorCpf(cpf);
        return entity.getPontos();
    }
}
