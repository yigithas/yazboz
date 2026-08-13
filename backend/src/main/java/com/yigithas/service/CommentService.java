package com.yigithas.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.yigithas.dto.CommentCreateDto;
import com.yigithas.dto.CommentResponseDto;
import com.yigithas.models.Articles;
import com.yigithas.models.Comment;
import com.yigithas.models.Writers;
import com.yigithas.repository.ArticlesRepository;
import com.yigithas.repository.CommentRepository;
import com.yigithas.repository.WritersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticlesRepository articlesRepository;
    private final WritersRepository writersRepository;

    // 1. Yorum Ekleme (Oturum açan kullanıcı için)
    public CommentResponseDto addComment(CommentCreateDto dto, String username) {
        Articles article = articlesRepository.findById(dto.getArticleId())
                .orElseThrow(() -> new RuntimeException("Makale bulunamadı!"));

        Writers writer = writersRepository.findByNickName(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setArticle(article);
        comment.setWriter(writer);

        Comment savedComment = commentRepository.save(comment);
        return CommentResponseDto.fromEntity(savedComment);
    }

    // 2. Makaleye Ait Yorumları Getirme
    public List<CommentResponseDto> getCommentsByArticleId(Long articleId) {
        return commentRepository.findByArticleIdOrderByCreatedAtDesc(articleId)
                .stream()
                .map(CommentResponseDto::fromEntity)
                .toList();
    }
}