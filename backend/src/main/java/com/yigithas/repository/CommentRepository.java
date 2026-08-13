package com.yigithas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.yigithas.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    
    List<Comment> findByArticleIdOrderByCreatedAtDesc(Long articleId);
}