package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class MenuDTO {
  private int menuIdx;
  private int restaurantIdx;
  private String menuName;
  private String menuPrice;
  private String menuExplanation;
}
