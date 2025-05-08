package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class SeatDTO {
    private int seatId;
    private int resIdx;
    private String type;
    private String name;
    private int x;
    private int y;
    private String image;
    private Boolean isSelected;
}
