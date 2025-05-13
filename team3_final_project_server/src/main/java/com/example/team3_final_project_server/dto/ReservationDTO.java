package com.example.team3_final_project_server.dto;
import lombok.Data;

@Data
public class ReservationDTO {
  private int reservationIdx;
  private int userIdx;
  private int resIdx;

  // 남성, 여성, 유아, 총합
  private int rsvPeople;
  private int rsvMan;
  private int rsvWoman;
  private int rsvBaby;

  //시간 , 날
  private String rsvDate;
  private String rsvTime;

//  온 여부와 취소 여부 확인을 위한 컬럼
  private String rsvComeDatetime;
  private String rsvCancelDatetime;

  // 예약메뉴 수량 체크
  private int rsvMenuCount;

  // 사장 페이지 메뉴 확인해서 들고올 List user Join
  private String userNick;
  private String userCall;
  private int visitCount;
}
