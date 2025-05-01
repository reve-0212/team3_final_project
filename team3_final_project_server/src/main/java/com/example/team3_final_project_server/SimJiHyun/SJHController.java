package com.example.team3_final_project_server.SimJiHyun;

import com.example.team3_final_project_server.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class SJHController {

  @Autowired
  private SJHService sjhService;

  @PostMapping("/login")
  public int logIn(@RequestParam("userId") String userId, @RequestParam("userPass") String userPass) {
    return sjhService.hasUser(userId, userPass);
  }

  @PostMapping("/getUserData")
  public UserDTO getUserData(@RequestParam("userId") String userId, @RequestParam("userPass") String userPass) {
    System.out.println(sjhService.getUserData(userId, userPass));
    return sjhService.getUserData(userId, userPass);
  }
}
