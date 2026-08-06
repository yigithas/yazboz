package com.yigithas.dto;

import com.yigithas.models.Articles;

public record ArticleListDto(
    Long id,
    String title,
    String imageUrl,
    String summary,
    String writerNickName
) {
    public static ArticleListDto fromEntity(Articles article) {
        String fullContent = article.getContent();
        String summary = "";
        if (fullContent != null && !fullContent.isBlank()) {
            String[] words = fullContent.trim().split("\\s+");
            if (words.length <= 20) {
                summary = fullContent;
            } else {
                summary = String.join(" ", java.util.Arrays.copyOfRange(words, 0, 20)) + "...";
            }
        }
        
        String nickName = (article.getWriters() != null) ? article.getWriters().getNickName() : "Anonim";
        
        return new ArticleListDto(
            article.getId(), 
            article.getTitle(), 
            article.getImageUrl(), 
            summary, 
            nickName
        );
    }
}