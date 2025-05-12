package com.example.team3_final_project_server.dto;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
public class RestaurantDTO {
  private int resIdx;
  private int userIdx;
  private String resImage1;
  private String resImage2;
  private String resImage3;
  private String resName;
  private String resCall;
  private String resAddress1;
  private String resAddress2;
  private String resIntroduce;
  private String resReserveTime;
  private double resLat;
  private double resLng;
  private String resPriceRange;
  private String reserveOrWaiting;
  private String resOption;
}
