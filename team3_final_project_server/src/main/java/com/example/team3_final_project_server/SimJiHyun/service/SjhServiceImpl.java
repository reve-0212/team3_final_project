package com.example.team3_final_project_server.SimJiHyun.service;

import com.example.team3_final_project_server.SimJiHyun.mapper.SJHMapper;
import com.example.team3_final_project_server.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SjhServiceImpl implements SjhService {
  @Autowired
  private SJHMapper sjhMapper;

  public int hasUser(String userId, String userPass) {
    return sjhMapper.hasUser(userId, userPass);
  }

  public UserDTO getUserData(String userId, String userPass) {
    return sjhMapper.getUserData(userId, userPass);
  }
}
