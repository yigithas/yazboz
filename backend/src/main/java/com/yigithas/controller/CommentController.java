package com.yigithas.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.yigithas.dto.CommentCreateDto;
import com.yigithas.dto.CommentResponseDto;
import com.yigithas.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin
public class CommentController {

    private final CommentService commentService;

    // Herkes görebilir: Makalenin yorumlarını getir
    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok(commentService.getCommentsByArticleId(articleId));
    }

    // Sadece Giriş Yapmış Kullanıcılar: Yorum Ekle (Token Lazım)
    @PostMapping("/add")
    public ResponseEntity<?> addComment(
            @RequestBody CommentCreateDto dto,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Yorum yapmak için giriş yapmalısınız.");
        }

        String username = authentication.getName();
        return ResponseEntity.ok(commentService.addComment(dto, username));
    }
}