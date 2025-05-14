package com.example.team3_final_project_server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
public class SeatDTO {
    private Integer seatId;
    private int userIdx;
    private Integer resIdx;
    private String type;
    private String name;
    private int x;
    private int y;
    private String image;
    private Boolean isSelected;
}
