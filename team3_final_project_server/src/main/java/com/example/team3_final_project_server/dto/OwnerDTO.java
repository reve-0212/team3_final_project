package com.example.team3_final_project_server.dto;


import lombok.Data;

@Data
public class OwnerDTO {
    private String ownerId;   // 사장님 아이디
    private String ownerPass;  // 사장님 비밀번호
    private String ownerName; // 대표자명
    private String ownerNumber; // 대표자 번호
    private String bsName; // 사업장 이름
    private String bsNumber;  // 사업장 번호
}
