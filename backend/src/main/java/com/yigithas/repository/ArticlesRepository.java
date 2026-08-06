package com.yigithas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.yigithas.models.Articles;

@Repository
public interface ArticlesRepository extends JpaRepository<Articles, Long> {
    
    // Slider için son yüklenen 3 makale
    List<Articles> findTop3ByOrderByCreatedAtDesc();
}