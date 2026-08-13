package com.yigithas.dto;

import java.time.LocalDateTime;
import com.yigithas.models.Comment;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentResponseDto {
    private Long id;
    private String content;
    private String writerNickName; 
    private LocalDateTime createdAt;

    public static CommentResponseDto fromEntity(Comment comment) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .writerNickName(comment.getWriter().getNickName())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}