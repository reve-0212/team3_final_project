package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class RestaurantDTO {
  private int restaurantIdx;
  private String restaurantNumber;
  private String restaurantName;
  private String restaurantAddr;
  private String restaurantCall;
//  private String restaurantHour;  db에 아직 추가되지 않음.
  private double restaurantLatitude;
  private double restaurantLongitude;
  private String restaurantPriceRange;
  private String restaurantIntroduce;
  private String reserveOrWaiting;
  private String restaurantImage1;
  private String restaurantImage2;
  private String restaurantImage3;
}
