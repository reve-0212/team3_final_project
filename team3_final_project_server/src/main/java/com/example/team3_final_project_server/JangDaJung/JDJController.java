package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
@CrossOrigin(origins ="http://localhost:5173")
public class JDJController {

  @Autowired
  private JDJService jdjService;

//  @Autowired
//  private DummyDataInsert dummyDataInsert;

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
      @RequestParam int resIdx
  ) {
    return jdjService.getVisitorGender(startDate, endDate, resIdx);
  }

//  매출 총액
  @GetMapping("/sales/total")
  public Map<String, Object> getSalesTotalPrice(
      @RequestParam String startDate,
      @RequestParam String endDate,
      @RequestParam int resIdx
  ) {
    return jdjService.getSalesTotalPrice(startDate, endDate, resIdx);
  }

//  메뉴별 매출
  @GetMapping("/sales/menu")
  public List<ReservationHistoryDTO> getMenuTotalPrice(
      @RequestParam String startDate,
      @RequestParam String endDate,
      @RequestParam int resIdx
  ) {
    return jdjService.getMenuTotalPrice(startDate, endDate, resIdx);
  }

//  시간대별 예약팀 수
  @GetMapping("reservation/hour")
  public List<Map<String, Object>> getTeamCountByHour(
      @RequestParam String startDate,
      @RequestParam String endDate,
      @RequestParam int resIdx
  ) {
    System.out.println("startDate = " + startDate);
    System.out.println("endDate = " + endDate);
    System.out.println("resIdx = " + resIdx);
    return jdjService.getTeamCountByHour(startDate, endDate, resIdx);
  }

//  @GetMapping("/api/dummy/insert")
//  public String insertDummyData() {
//    dummyDataInsert.insertDummyData();
//    return "더미 데이터 삽입 완료!";
//  }
}
