package com.example.team3_final_project_server.dto;


import lombok.Data;

@Data
public class OwnerDTO {
    private String ownerId;
    private String ownerPass;
    private String ownerName;
    private int ownerNumber;
    private String bsName;
    private int bsNumber;
}
