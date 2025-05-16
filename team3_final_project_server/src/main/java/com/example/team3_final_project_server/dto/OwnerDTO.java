package com.example.team3_final_project_server.dto;


import lombok.Data;

@Data
public class OwnerDTO {
    private int userIdx;
    private String userId;
    private String userPass;
    private String userNick;
    private String userGender;
    private int userAge;
    private String userCall;
    private String userEmail;
    private String role;

    //  사장전용
    private String bsName;
    private String bsNumber;
    private String resImage1;
}
