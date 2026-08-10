package com.yigithas.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final Path rootLocation = Paths.get("uploads");

    public String saveFile(MultipartFile file) {
        try {
            // Klasör yoksa oluştur
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }

            // Dosya isimleri çakışmasın diye rastgele UUID ekliyoruz
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName));

            // Frontend'in erişebileceği URL'i dönüyoruz
            return "http://localhost:8081/uploads/" + fileName;
        } catch (Exception e) {
            throw new RuntimeException("Dosya yüklenemedi!", e);
        }
    }
}
