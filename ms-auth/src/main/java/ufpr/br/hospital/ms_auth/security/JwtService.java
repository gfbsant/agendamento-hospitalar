package ufpr.br.hospital.ms_auth.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ufpr.br.hospital.ms_auth.entity.Usuario;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Base64;

@Service
public class JwtService {

    private final SecretKey key;

    public JwtService(@Value("${jwt.secret}") String secret) {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String gerarToken(Usuario usuario) {
        return Jwts.builder()
                .subject(usuario.getEmail())
                .claim("tipo", usuario.getTipo())
                .claim("cpf", usuario.getCpf())
                .issuedAt(new Date())
                .expiration(Date.from(LocalDateTime.now().plusHours(8)
                        .atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

}