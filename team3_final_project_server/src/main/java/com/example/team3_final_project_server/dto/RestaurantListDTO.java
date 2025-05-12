package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class RestaurantListDTO {
  private int resIdx;

  // 이미지 칼럼
  private String resImage1;
  private String resImage2;
  private String resImage3;

  private String resName;
  private String resCall;

  private String resAddress1;
  private String resAddress2;

  private String resIntroduce;
  private String resReserveTime;

  //위치 위도, 경도
  private String resLat;
  private String resLng;

  // 매장 소개, 가격대
  private String resPriceRange;

  // 웨이팅 / 예약
  private String reserveOrWaiting;

  // 필수 JOIN 칼럼 추가
  private String categoryName;
  private Double avgRating;
  private int rvCount;
  private String resOption1;
  private String restOption1;


}
