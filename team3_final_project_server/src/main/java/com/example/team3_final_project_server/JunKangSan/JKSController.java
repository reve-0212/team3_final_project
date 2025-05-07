package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class JKSController {

  @Autowired
  private JKSService jksService;

  @GetMapping("/test22")
  @ResponseBody
  public String test() {
    List<RestaurantDTO> restaurants = jksService.getAllRestaurants();
    System.out.println("테스트 DTO 확인: " + restaurants);
    return "출력 완료";
  }
}
