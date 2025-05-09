package com.example.team3_final_project_server.dto;

// 임시로 만든 가게 안내 테이블(공지)


import lombok.Data;
import org.apache.ibatis.type.NStringTypeHandler;

@Data
public class AnnounceDTO {
    private int announceIdx;
    private String announceContent;
}
