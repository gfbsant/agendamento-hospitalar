package br.gfbsant.hospital.ms_auth.service;

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
        message.setFrom("HOSPITADS");
        message.setSubject("Senha inicial");
        message.setText("Bem vindo ao Hospitads! \nSua senha inicial é: " + senha);
        mailSender.send(message);
    }
}
