package com.example.team3_final_project_server.dto;

import lombok.Data;

import java.awt.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReservationHistoryDTO {
  private int reservationIdx;
  private int resIdx;
  private LocalDateTime reservationDate;
  private int maleCount;
  private int femaleCount;
  private int genderTotalCount;

//  private List<ReservationHistoryMenuDTO> menus;  // 여러 메뉴를 담을 리스트

  private int menuIdx;
  private String menuName;
  private int menuPrice;
  private int menuSoldCount;
  private int menuSoldTotalPrice;

  private LocalDateTime checkoutDate;
  private LocalDateTime cancelDate;
  private int reservationTeamCount;
}

