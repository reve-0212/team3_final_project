package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class RestaurantDTO {
  private int restaurantIdx;
  private String restaurantAddr;
  private String restaurantCall;
  private String restaurantHour;
  private double restaurantLatitude;
  private double restaurantLongitude;
  private String restaurantPriceRange;
  private String restaurantIntroduce;
}
