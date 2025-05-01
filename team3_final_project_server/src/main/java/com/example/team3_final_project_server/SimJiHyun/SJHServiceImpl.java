package com.example.team3_final_project_server.SimJiHyun;

import com.example.team3_final_project_server.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SJHServiceImpl implements SJHService {
  @Autowired
  private SJHMapper sjhMapper;

  @Override
  public int hasUser(String userId, String userPass) {
    return sjhMapper.hasUser(userId, userPass);
  }

  @Override
  public UserDTO getUserData(String userId, String userPass) {
    return sjhMapper.getUserData(userId, userPass);
  }
}
