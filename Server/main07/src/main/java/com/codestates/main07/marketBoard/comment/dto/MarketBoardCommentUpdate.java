package com.codestates.main07.marketBoard.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MarketBoardCommentUpdate {
    private long memberId;
    private long marketBoardCommentId;
    private Long parentId;
    private String content;
    private String nickname;
    private LocalDateTime modifiedAt;
}
