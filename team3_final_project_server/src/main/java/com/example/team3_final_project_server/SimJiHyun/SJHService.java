package com.example.team3_final_project_server.SimJiHyun;

import com.example.team3_final_project_server.dto.UserDTO;

public interface SJHService {
  int hasUser(String userId, String userPass);

  UserDTO getUserData(String userId, String userPass);
}
