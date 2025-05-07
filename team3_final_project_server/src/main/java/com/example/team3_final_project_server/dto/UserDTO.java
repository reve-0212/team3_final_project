package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class UserDTO {
  private int userIdx;
  private String userId;
  private String userPass;
  private String userName;
  private String userGender;
  private int userAge;
  private String userCall;
  private String userEmail;
//  private int userLevel;  db에 아직 추가되지 않음
}
