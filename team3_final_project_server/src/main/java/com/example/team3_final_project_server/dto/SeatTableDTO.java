package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class SeatTableDTO {
    private int seatId;
    private int restaurantIdx;
    private int resSeatId;
    private String type;
    private String name;
    private int x;
    private int y;
    private String image;
}
