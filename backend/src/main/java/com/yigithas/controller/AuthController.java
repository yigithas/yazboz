// AuthController.java
package com.yigithas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.yigithas.dto.AuthRequestDto;
import com.yigithas.models.Writers;
import com.yigithas.repository.WritersRepository;
import com.yigithas.security.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final WritersRepository writersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /*  Yazar Kaydı (Register)
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Writers writer) {
        writer.setPassword(passwordEncoder.encode(writer.getPassword())); // Şifreyi BCrypt ile hash'le
        writersRepository.save(writer);
        return ResponseEntity.ok("Yazar başarıyla kaydedildi.");
    }*/

    // Yazar Girişi ve JWT Alma (Login)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequestDto authRequest) {
        Writers writer = writersRepository.findByNickName(authRequest.nickName())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

        // Şifre kontrolü
        if (passwordEncoder.matches(authRequest.password(), writer.getPassword())) {
            String token = jwtService.generateToken(writer.getNickName());
            return ResponseEntity.ok(token); // Giriş başarılıysa JWT Token dönüyoruz
        } else {
            return ResponseEntity.status(401).body("Hatalı Şifre!");
        }
    }
}