package com.example.team3_final_project_server.dto;

import lombok.Data;

import java.util.List;

@Data
public class CategoryDTO {
    private int categoryIdx;
    private int resIdx;
    private String categoryAddr;
    private String categoryName;
    private String categoryTag;
}
