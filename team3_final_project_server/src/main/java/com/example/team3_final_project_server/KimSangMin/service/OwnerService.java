package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.dto.OwnerDTO;

public interface OwnerService {

//    사장님 회원가입
    boolean signOwner(OwnerDTO ownerDTO);

//    사장님 로그인
    OwnerDTO loginOwner(OwnerDTO ownerDTO);

//    사장님 정보 조회
    boolean ownerInfo(OwnerDTO ownerDTO);

    boolean updateOwner(OwnerDTO ownerDTO);

}
