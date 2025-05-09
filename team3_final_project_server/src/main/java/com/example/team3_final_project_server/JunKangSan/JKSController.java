package com.example.team3_final_project_server.JunKangSan;
//JKSController.java

import com.example.team3_final_project_server.dto.AnnounceDTO;
import com.example.team3_final_project_server.dto.BestMenuDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@Controller
public class JKSController {

  @Autowired
  private JKSService jksService;

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

//  대표메뉴
  @GetMapping("/bestmenu")
  @ResponseBody
  public List<BestMenuDTO> getBestMenus(@RequestParam int resIdx) {
    return jksService.getBestMenusByResIdx(resIdx);
  }


//  리뷰
  @GetMapping("/reviews")
  @ResponseBody
  public List<ReviewDTO> getReviews(@RequestParam int resIdx) {
    return jksService.getReviewsByResIdx(resIdx);
  }

// 알림(가게공지)
  @GetMapping("/announce")
  @ResponseBody
  public AnnounceDTO getAnnounce() {
    return jksService.getLatestAnnounce(); // List가 아닌 단일 DTO 반환
  }

}
