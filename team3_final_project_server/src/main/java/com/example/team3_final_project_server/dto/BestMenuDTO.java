package com.example.team3_final_project_server.dto;

// 임시로 만든 대표메뉴 테이블

import lombok.Data;

@Data
public class BestMenuDTO {
    private int bestmenuIdx;
    private int testresIdx;
    private String testmenuName;
    private String testmenuDesc;
    private String testmenuPrice;
}
