package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class CategoryDTO {
    private int categoryIdx;
    private int restaurantIdx;
    private String categoryAddr;
    private String categoryName;
    private String categoryTag;
}
