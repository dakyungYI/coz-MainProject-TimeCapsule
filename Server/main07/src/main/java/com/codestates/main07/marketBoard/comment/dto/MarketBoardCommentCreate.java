package com.codestates.main07.marketBoard.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MarketBoardCommentCreate {
    private long memberId;
    private Long marketBoardId;
    private long marketBoardCommentId;
    private Long parentId;
    private String content;
    private String nickname;
    private LocalDateTime createdAt;

    public MarketBoardCommentCreate(String content) {
        this.content = content;
    }
}
