package com.codestates.main07.marketBoardLike.dto;

import com.codestates.main07.member.entity.Member;
import com.codestates.main07.marketBoard.board.MarketBoard;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class LikeResponseDto {
    private boolean liked;
    private boolean success;

    public LikeResponseDto(boolean liked) {
        this.liked = liked;
    }
}
