package com.yigithas.dto;

import java.time.LocalDateTime;
import com.yigithas.models.Articles;

public record ArticleDetailDto(
    Long id,
    String title,
    String content,
    String type,
    String imageUrl,
    String writerNickName,
    LocalDateTime createdAt
) {
    public static ArticleDetailDto fromEntity(Articles article) {
        String nickName = (article.getWriters() != null) ? article.getWriters().getNickName() : "Anonim";
        return new ArticleDetailDto(
            article.getId(),
            article.getTitle(),
            article.getContent(),
            article.getType(),
            article.getImageUrl(),
            nickName,
            article.getCreatedAt()
        );
    }
}