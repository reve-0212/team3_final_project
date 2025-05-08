package com.example.team3_final_project_server.dto;

import lombok.Data;

import java.util.List;

@Data
public class SeatSaveRequest {
    private int resIdx;
    private List<SeatDTO> seats;
}
