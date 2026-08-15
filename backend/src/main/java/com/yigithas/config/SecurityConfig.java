package com.yigithas.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.yigithas.security.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // REST API ve Postman için CSRF kapalı
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Temiz CORS konfigürasyonu
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
            	    // Preflight (CORS OPTIONS) isteklerine izin ver
            	    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

            	    // Auth ve Resim erişimleri
            	    .requestMatchers("/api/auth/**").permitAll()
            	    .requestMatchers("/uploads/**").permitAll()
                    .requestMatchers("/error").permitAll()

            	    // Bütün GET isteklerine (Slider, Liste, Detay vb.) koşulsuz izin ver
            	    .requestMatchers(HttpMethod.GET, "/api/articles", "/api/articles/**").permitAll()
            	    .requestMatchers(HttpMethod.GET, "/api/comments/**").permitAll()

            	    // Sadece makale ekleme/güncelleme/silme gibi POST/PUT/DELETE işlemleri JWT zorunlu
            	    .requestMatchers(HttpMethod.POST, "/api/articles/**").authenticated()
            	    .requestMatchers(HttpMethod.POST, "/api/comments/**").authenticated()
            	    
            	    .anyRequest().authenticated()
            	)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // CORS Sorunlarını ve 403 Bloklamalarını Önleyen Bean
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*")); // Tüm kökenlere izin ver
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}