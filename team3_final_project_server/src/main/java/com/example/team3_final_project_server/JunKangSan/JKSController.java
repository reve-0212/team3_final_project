package com.example.team3_final_project_server.JunKangSan;
//JKSController.java

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.AmenitiesDTO;
import com.example.team3_final_project_server.dto.BestMenuDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import com.example.team3_final_project_server.dto.AnnounceDTO;
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


  // 식당 단일 상세보기
  @GetMapping("/resdetail/{resIdx}")
  @ResponseBody
  public RestaurantDTO getRestaurantByResIdx(@PathVariable int resIdx) {
    RestaurantDTO dto = jksService.getRestaurantsByResIdx(resIdx);
    System.out.println(dto); // 콘솔 확인용 출력
    return jksService.getRestaurantsByResIdx(resIdx); // 단일 DTO 응답
  }


//  편의시설
@GetMapping("/amenities/{resIdx}")
@ResponseBody
public AmenitiesDTO getAmenities(@PathVariable int resIdx) {
    AmenitiesDTO dto = jksService.getAmenitiesByResIdx(resIdx);
    System.out.println(dto);
  return jksService.getAmenitiesByResIdx(resIdx);
}


//  대표메뉴
  @GetMapping("/bestmenu/{resIdx}")
  @ResponseBody
  public List<BestMenuDTO> getBestMenus(@RequestParam int resIdx) {
    return jksService.getBestMenusByResIdx(resIdx);
  }


//  리뷰
  @GetMapping("/reviews/{resIdx}")
  @ResponseBody
  public List<ReviewDTO> getReviews(@RequestParam int resIdx) {
    return jksService.getReviewsByResIdx(resIdx);
  }


// 알림(가게공지)
  @GetMapping("/announce/{resIdx}")
  @ResponseBody
  public AnnounceDTO getAnnounce() {
    return jksService.getLatestAnnounce(); // List가 아닌 단일 DTO 반환
  }

}
