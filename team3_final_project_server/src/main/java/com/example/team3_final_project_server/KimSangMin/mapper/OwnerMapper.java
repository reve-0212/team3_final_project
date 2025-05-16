package com.example.team3_final_project_server.KimSangMin.mapper;

import com.example.team3_final_project_server.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface OwnerMapper {

  Optional<UserDTO> findByUserId(String userId);

  boolean existsByUserId(String userId);

  void saveUser(UserDTO user);

  void updatePassword(String userId, String hashed);

  void updateField(String userId, String field, String value);
}