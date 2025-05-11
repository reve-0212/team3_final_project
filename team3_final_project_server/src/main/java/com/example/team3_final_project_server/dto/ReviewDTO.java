package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class ReviewDTO {
  private int ReviewIdx;
  private int userIdx;
  private int restaurantIdx;
  private int menuIdx;
  private String isOnePick;
  private double reviewRating;
  private String reviewContent;
  private String reviewWriteDate;
  private String reviewVisitedDate;
  private String reviewImage1;
  private String reviewImage2;
  private String reviewImage3;
  private String reviewType;
}
