package com.example.team3_final_project_server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDTO {
  private String accessToken;
  private String refreshToken;
}
