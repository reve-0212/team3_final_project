package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class AmenitiesDTO {
  private int AmenitiesIdx;
  private int restaurantIdx;

//  편의시설 여부와 안내문 컬럼
  private String hasParking;
  private String parkingInfo;

  private String noDeposit;
  private String depositInfo;

  private String hasGroupSeat;
  private String groupSeatInfo;

  private String hasCoronation;
  private String coronationInfo;

  private String hasCorkage;
  private String corkageInfo;

  private String hasKidsZone;
  private String kidsZoneInfo;

  private String hasWifi;
  private String wifiInfo;

  private String hasWaitingArea;
  private String waitingAreaInfo;
}
