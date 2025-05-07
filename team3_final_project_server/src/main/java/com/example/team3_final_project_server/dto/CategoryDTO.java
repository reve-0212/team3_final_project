package com.example.team3_final_project_server.dto;


import lombok.Data;

@Data
public class CategoryDTO {
    private int categoryIdx;
    private int restaurantIdx;
    private String category_addr;
    private String category_name;
    private String category_tag;
}
