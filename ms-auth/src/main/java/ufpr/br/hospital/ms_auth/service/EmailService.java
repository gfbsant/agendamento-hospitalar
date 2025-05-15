package ufpr.br.hospital.ms_auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarSenhaInicial(String destinatario, String senha) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(destinatario);
        message.setSubject("Senha inicial - Sistema Hospitalar");
        message.setText("Sua senha inicial é: " + senha);
        mailSender.send(message);
    }
}
