package com.yigithas.service;

import java.security.PublicKey;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yigithas.dto.ArticleDetailDto;
import com.yigithas.dto.ArticleListDto;
import com.yigithas.models.Articles;
import com.yigithas.models.Writers;
import com.yigithas.repository.ArticlesRepository;
import com.yigithas.repository.WritersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticlesRepository articlesRepository;
    private final WritersRepository writersRepository;

    // Makale Kaydetme (Yazar ilişkisi ile)
    public Articles saveArticlesByUsername(Articles article, String username) {
        Writers writer = writersRepository.findByNickName(username) // veya findByUsername
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + username));
        
        article.setWriters(writer);
        return articlesRepository.save(article);
    }

    // Slider için Son 3 Makale DTO
    public List<ArticleListDto> getSliderArticles() {
        return articlesRepository.findTop3ByOrderByCreatedAtDesc()
                .stream()
                .map(ArticleListDto::fromEntity)
                .toList();
    }

    // 10'lu Pageable Liste DTO
    public Page<ArticleListDto> getArticlesPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return articlesRepository.findAll(pageable)
                .map(ArticleListDto::fromEntity);
    }

    // Detay Sayfası DTO
    public ArticleDetailDto getArticleById(Long id) {
        Articles article = articlesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Makale bulunamadı!"));
        return ArticleDetailDto.fromEntity(article);

    }
    
    //Türe göre
    public Page<ArticleListDto> getArticleByType(String type,int page, int size) {
    	Pageable pageable = PageRequest.of(page, size,Sort.by("createdAt").descending());
    	return articlesRepository.findByType(type, pageable)
    			.map(ArticleListDto::fromEntity);
    }
}