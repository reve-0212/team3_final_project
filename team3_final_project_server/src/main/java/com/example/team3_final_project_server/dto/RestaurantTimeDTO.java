package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class RestaurantTimeDTO {
    private int timeIdx;
    private int resIdx;
    private String day;
    private String startTime;
    private String endTime;
}
