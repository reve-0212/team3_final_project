//package com.example.team3_final_project_server.KimSangMin.mapper;
//
//import com.example.team3_final_project_server.dto.OwnerDTO;
//import com.example.team3_final_project_server.dto.UserDTO;
//import com.example.team3_final_project_server.dto.join.ResvJoinRestDTO;
//import com.example.team3_final_project_server.dto.join.ResvRestMenuJoinDTO;
//import org.apache.ibatis.annotations.Mapper;
//
//import java.util.List;
//import java.util.Optional;
//
//@Mapper
//public interface OwnerMapper {
//
//    Optional<UserDTO> findByUserId(String userId);
//    boolean existsByUserId(String userId);
//    void saveUser(UserDTO user);
//    void updatePassword(String userId, String hashed);
//    void updateField(String userId, String field, String value);
//
////
//////    사장님 정보 저장(관리자)
////    void saveOwner(OwnerDTO owner);
////
//////    사장님 로그인
////    OwnerDTO loginOwner(OwnerDTO ownerDTO);
////
////// 사장님ID로 입력된 정보 가져오기
////    OwnerDTO findOwnerId(OwnerDTO ownerDTO);
////// 사장님 정보 수정하기
////    int updateOwner(OwnerDTO ownerDTO);
//
//}
