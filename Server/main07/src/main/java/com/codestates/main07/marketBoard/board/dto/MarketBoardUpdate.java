package com.codestates.main07.marketBoard.board.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MarketBoardUpdate {
    private long marketBoardId;
    private String title;
    private String content;
    private int viewCount;

    @Builder
    public MarketBoardUpdate(String title, String content, int viewCount) {
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
    }
}
