package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class JDJController {

  @Autowired
  private JDJService jdjService;

  // 기간별 조회 API
  @GetMapping("/date")
  public List<ReservationHistoryDTO> getHistoryByPeriod(
      @RequestParam String startDate,
      @RequestParam String endDate
  ) {
    return jdjService.getHistoryByDate(startDate, endDate);
  }

//  성별
  @GetMapping("/visitors")
  public Map<String, Object> getVisitorGender(
      @RequestParam String startDate,
      @RequestParam String endDate,
      @RequestParam int restaurantIdx
  ) {
    return jdjService.getVisitorGender(startDate, endDate, restaurantIdx);
  }

//  매출 총액
  @GetMapping("/sales/total")
  public Map<String, Object> getSalesTotalPrice(
      @RequestParam String startDate,
      @RequestParam String endDate,
      @RequestParam int restaurantIdx
  ) {
    return jdjService.getSalesTotalPrice(startDate, endDate, restaurantIdx);
  }

//  메뉴별 매출
  @GetMapping("/sales/menu")
  public List<Map<String, Object>> getMenuTotalPrice(
      @RequestParam String startDate,
      @RequestParam String endDate,
      @RequestParam int restaurantIdx
  ) {
    return jdjService.getMenuTotalPrice(startDate, endDate, restaurantIdx);
  }

//  시간대별 예약팀 수
  @GetMapping("reservation/hour")
  public List<Map<String, Object>> getTeamCountByHour(
      @RequestParam String StartDate,
      @RequestParam String endDate,
      @RequestParam int restaurantIdx
  ) {
    return jdjService.getTeamCountByHour(StartDate, endDate, restaurantIdx);
  }
}
