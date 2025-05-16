package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class MenuDTO {
  private int menuIdx;
  private int resIdx;
  private String menuName;
  private int menuPrice;
  private String menuExplanation;
  private String menuImage;
  private String menuHidden;
  private String menuSoldOut;
//  private boolean menuHidden = false;
//  private boolean menuSoldOut = false;
  private int menuSort; // 정렬 순서용
}
