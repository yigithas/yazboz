package com.yigithas.dto;

import lombok.Data;

@Data
public class CommentCreateDto {
    private Long articleId;
    private String content;
}