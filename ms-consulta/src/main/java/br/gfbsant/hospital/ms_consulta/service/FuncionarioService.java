package br.gfbsant.hospital.ms_consulta.service;

import br.gfbsant.hospital.ms_consulta.dto.FuncionarioDTO;
import br.gfbsant.hospital.ms_consulta.entity.Funcionario;
import br.gfbsant.hospital.ms_consulta.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public void criar(FuncionarioDTO dto) {
        if (funcionarioRepository.existsByCpf(dto.getCpf()) ||
                funcionarioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Funcionario com E-mail ou CPF já existe");
        }
        Funcionario funcionario = new Funcionario();
        funcionario.setNome(dto.getNome());
        funcionario.setCpf(dto.getCpf());
        funcionario.setEmail(dto.getEmail());
        funcionario.setTelefone(dto.getTelefone());
        funcionario.setAtivo(true);
        funcionarioRepository.save(funcionario);
    }

    public void atualizar(String cpf, FuncionarioDTO dto) {
        Funcionario funcionario = funcionarioRepository.findByCpf(cpf).orElseThrow(() -> new RuntimeException("Funcionario não localizado."));
        funcionario.setNome(dto.getNome());
        funcionario.setEmail(dto.getTelefone());
        funcionario.setTelefone(dto.getTelefone());
        funcionarioRepository.save(funcionario);
    }

    public void inativar(String cpf) {
        Funcionario funcionario = funcionarioRepository.findByCpf(cpf).orElseThrow(() -> new RuntimeException("Funcionario não localizado."));
        funcionario.setAtivo(false);
        funcionarioRepository.save(funcionario);
    }
}
