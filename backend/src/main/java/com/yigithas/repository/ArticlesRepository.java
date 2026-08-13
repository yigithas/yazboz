package com.yigithas.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.yigithas.models.Articles;

@Repository
public interface ArticlesRepository extends JpaRepository<Articles, Long> {
    
    // Slider için son yüklenen 3 makale
    List<Articles> findTop3ByOrderByCreatedAtDesc();
    
    Page<Articles> findByType(String type, Pageable pageable);
    
    Page<Articles> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
}