package com.yigithas.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.apache.catalina.connector.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.yigithas.dto.ArticleDetailDto;
import com.yigithas.dto.ArticleListDto;
import com.yigithas.models.Articles;
import com.yigithas.service.ArticleService;
import com.yigithas.service.FileStorageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor 
@CrossOrigin(origins = "*")
public class ArticleController {

    private final ArticleService articleService;
    private final FileStorageService fileStorageService;

    // 1. Makale Ekleme (Resim Yüklemeli)
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Articles> createArticle(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("type") String type,
            @RequestParam("image") MultipartFile imageFile,
            Authentication authentication) { // Spring Security token'dan kullanıcıyı otomatik yakalar

        // Token içindeki kullanıcı adı (username / nickname)
        String username = authentication.getName();

        String imageUrl = fileStorageService.saveFile(imageFile);

        Articles article = new Articles();
        article.setTitle(title);
        article.setContent(content);
        article.setType(type);
        article.setImageUrl(imageUrl);

        // Servis katmanında username ile yazar bulunur
        return ResponseEntity.ok(articleService.saveArticlesByUsername(article, username));
    }

    // 2. Slider İçin Son 3 Makale
    @GetMapping(path = "/sliderArticles")
    public ResponseEntity<List<ArticleListDto>> getSliderArticles() {
        return ResponseEntity.ok(articleService.getSliderArticles());
    }

    // 3. 10'lu Pageable Liste
    @GetMapping(path = "/list")
    public ResponseEntity<Page<ArticleListDto>> getArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(articleService.getArticlesPage(page, size));
    }

    // 4. Detay Sayfası
    @GetMapping("/list/{id}")
    public ResponseEntity<ArticleDetailDto> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<Page<ArticleListDto>> getArticles(
    		@PathVariable String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
    	return ResponseEntity.ok(articleService.getArticleByType(type,page,size));
    }
}