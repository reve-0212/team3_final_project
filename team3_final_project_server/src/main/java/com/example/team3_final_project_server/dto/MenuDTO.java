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
  private boolean menuHidden;
  private boolean menuSoldOut;
  private int menuSort; // 정렬 순서용
}
