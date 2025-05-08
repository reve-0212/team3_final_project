package com.example.team3_final_project_server.KimSangMin.mapper;

import com.example.team3_final_project_server.dto.OwnerDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OwnerMapper {
//    사장님 정보 저장(관리자)
    void saveOwner(OwnerDTO owner);

//    사장님 로그인
    OwnerDTO loginOwner(OwnerDTO ownerDTO);

//// 사장님ID로 입력된 정보 가져오기
//    OwnerDTO findOwnerId(OwnerDTO ownerDTO);
//// 사장님 정보 수정하기
//    int updateOwner(OwnerDTO ownerDTO);
//
}
