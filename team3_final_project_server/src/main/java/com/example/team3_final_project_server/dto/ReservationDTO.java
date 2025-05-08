package com.example.team3_final_project_server.dto;


import lombok.Data;

@Data
public class ReservationDTO {
    private int reservationIdx;
    private int userIdx;
    private int resIdx;
    private int menuIdx;
    private String reservationDateTime;


    // 남성, 여성, 유아, 총합
    private int rsvPeople;
    private int rsvMan;
    private int rsvWoman;
    private int rsvBaby;
    private int reservationPeople;


    //시간 , 날짜
    private String rsvDate;
    private String rsvTime;
}
