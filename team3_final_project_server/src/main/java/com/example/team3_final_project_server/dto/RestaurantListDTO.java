package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class RestaurantListDTO {
  private int restaurantIdx;
  private String restaurantAddr;
  private String restaurantCall;

  //위치 위도, 경도
  private String restaurantLat;
  private String restaurantLng;

  // 매장 소개, 가격대
  private String restaurantIntroduce;
  private String restaurantPriceRange;

  // 웨이팅 / 예약
  private String reserveOrWaiting;

  // 이미지 칼럼
  private String restaurantImage1;
  private String restaurantImage2;
  private String restaurantImage3;


  // 필수 JOIN 칼럼 추가
  private String categoryName;
  private Double avgRating;
  private int rvCount;
  private String restOption1;


}
