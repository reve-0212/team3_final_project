package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class JKSController {

  @Autowired
  private JKSService jksService;

  @CrossOrigin(origins = "http://localhost:5173")
  @GetMapping("/test22")
  @ResponseBody
  public List<RestaurantDTO> test() {
    List<RestaurantDTO> restaurants = jksService.getAllRestaurants();

    // 콘솔 확인용 출력
    for (RestaurantDTO dto : restaurants) {
      System.out.println(dto); // 객체 전체 출력
    }

    return restaurants; // JSON 응답
  }
}
