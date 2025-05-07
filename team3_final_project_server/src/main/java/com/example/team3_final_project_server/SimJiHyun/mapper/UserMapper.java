package com.example.team3_final_project_server.SimJiHyun.mapper;

import com.example.team3_final_project_server.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface UserMapper {
  Optional<UserDTO> findByUserId(String userId);
  boolean existsByUserId(String userId);
  boolean existsByUserEmail(String userEmail);
  void save(UserDTO user);
  void deleteByUserId(String userId);
}
