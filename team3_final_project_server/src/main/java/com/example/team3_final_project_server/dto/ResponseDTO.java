package com.example.team3_final_project_server.dto;

import lombok.*;

// JWT 엑세스 토큰 / 리프레시 토큰을 저장한 DTO
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ResponseDTO<T> {
  private String accessToken;
  private String refreshToken;
  private int userIdx;
  private String userId;
  private String userNick;
  private String userCall;
  private String userEmail;
  private String role;

//  사장
  private String bsName;
  private String bsNumber;
}












