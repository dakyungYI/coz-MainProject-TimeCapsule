package com.codestates.main07.security.jwt.login;

import com.codestates.main07.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private boolean success;
    private String message;
    private String username;
    private String email;
    private long memberId;
    private String nickname;

    public LoginResponseDto(boolean success, String message, String username, String email, long memberId, String nickname) {
        this.success = success;
        this.message = message;
        this.username = username;
        this.email = email;
        this.memberId = memberId;
        this.nickname = nickname;
    }

    public static LoginResponseDto fromMember(Member member, boolean success, String message) {
        return new LoginResponseDto(
                success,
                message,
                member.getUsername(),
                member.getEmail(),
                member.getMemberId(),
                member.getNickname()
        );
    }
}
