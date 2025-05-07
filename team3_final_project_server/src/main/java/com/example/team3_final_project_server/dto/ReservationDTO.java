package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class ReservationDTO {
    private int reservationIdx;
    private int userIdx;
    private int restaurantIdx;
    private int menuIdx;
    private String reservationDateTime;
    private int reservationPeople;
}
