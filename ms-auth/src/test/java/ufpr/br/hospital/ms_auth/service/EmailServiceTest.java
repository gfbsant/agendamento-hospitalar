package ufpr.br.hospital.ms_auth.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.test.context.ActiveProfiles;
import ufpr.br.hospital.ms_auth.config.EmailTestConfig;
import ufpr.br.hospital.ms_auth.repository.UsuarioRepository;
import ufpr.br.hospital.ms_auth.security.JwtService;

@SpringBootTest(classes = {EmailService.class})
@ActiveProfiles("test")
@Import({EmailTestConfig.class, EmailServiceTest.TestConfig.class})
public class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    public void testEnviarEmail() {
        String to = "gfbsant@gmail.com";
        String senha = "123456";
        emailService.enviarSenhaInicial(to, senha);
        System.out.println("Email enviado com sucesso para " + to);
    }

    @Configuration
    static class TestConfig {
        @Bean
        @Primary
        public UsuarioRepository usuarioRepository() {
            return Mockito.mock(UsuarioRepository.class);
        }

        @Bean
        @Primary
        public JwtService jwtService() {
            return Mockito.mock(JwtService.class);
        }
    }
}