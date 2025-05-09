package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class ReservationHistoryMenuDTO {
    private int menuIdx;
    private String menuName;
    private int menuPrice;
    private int menuSoldCount;
    private int menuSoldTotalPrice;
}
