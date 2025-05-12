package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

//    통계 페이지

//    예약하기 -> 히스토리 테이블에 저장
    @PostMapping("/booking")
    public ResponseEntity<String> bookReservation(@RequestBody List<ReservationHistoryDTO> historyList) {
        jdjService.bookReservation(historyList);
        return ResponseEntity.ok("예약이 완료되었습니다.");
    }

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

    //  메뉴 정보 불러와서 판매량 계산
    @GetMapping("/sales")
    public List<Map<String,Object>> getMenuSales(
        @RequestParam String startDate,
        @RequestParam String endDate,
        @RequestParam int resIdx
    ) {
        return jdjService.getMenuSales(startDate, endDate, resIdx);
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

////    메뉴 페이지
//    @GetMapping("/menuList")
//    public void selectMenuList(@RequestParam int resIdx) {
//        jdjService.selectMenuList(resIdx);
//    }

//  @GetMapping("/api/dummy/insert")
//  public String insertDummyData() {
//    dummyDataInsert.insertDummyData();
//    return "더미 데이터 삽입 완료!";
//  }
}
