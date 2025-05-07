package com.example.team3_final_project_server.SimJiHyun.mapper;

import com.example.team3_final_project_server.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SJHMapper {
  int hasUser(String userId, String userPass);

  UserDTO getUserData(String userId, String userPass);

  UserDTO findByUserId(String userId);
}
