package com.example.team3_final_project_server.SimJiHyun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class SJHController {

  @Autowired
  private SJHService sjhService;

  @GetMapping("/sjh")
  public void home() {
    sjhService.home();
  }
}
