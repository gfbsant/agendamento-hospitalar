package ufpr.br.hospital.ms_auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {

    private String nome;
    private String email;
    private String cpf;
    private String senha;
    private String tipo;

}
