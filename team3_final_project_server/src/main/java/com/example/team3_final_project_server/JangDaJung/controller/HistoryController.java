package com.example.team3_final_project_server.JangDaJung.controller;

import com.example.team3_final_project_server.JangDaJung.JDJService;
import com.example.team3_final_project_server.JeonSeongYun.JSYService;
import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import com.example.team3_final_project_server.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
@CrossOrigin(origins ="http://localhost:5173")
public class HistoryController {

    @Autowired
    private JDJService jdjService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

//    resIdx 불러오기
//    @GetMapping("/resIdx")
//    public ResponseEntity<Integer> getResIdx(@RequestParam("userIdx") int userIdx) {
//        Integer resIdx = jdjService.findResIdxByUserIdx(userIdx);
//        return ResponseEntity.ok(resIdx);
//    }

    @GetMapping("/resIdxByUser")
    public ResponseEntity<?> getResIdxByUser(@RequestHeader("Authorization") String authorizationHeader) {
        // Authorization 헤더에서 토큰 추출
        String token = authorizationHeader.replace("Bearer ", "");

        // 토큰에서 인증 정보 얻기
        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        // UserDTO 객체에서 userIdx 추출
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        int userIdx = userDTO.getUserIdx();  // 여기서 userIdx를 추출

        // userIdx를 통해 예약 정보를 조회
        Optional<Integer> resIdx = jdjService.findResIdxByUserIdx(userIdx);

        if (resIdx.isPresent()) {
            return ResponseEntity.ok().body(resIdx.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("등록된 레스토랑이 없습니다.");
        }
    }

//    ------ 통계 페이지
//    가게 메인 페이지에서 오늘의 예약 불러오기

//    예약하기 -> 히스토리 테이블에 저장
    @PostMapping("/save")
    public ResponseEntity<String> bookReservation(@RequestBody List<ReservationHistoryDTO> historyList) {
        jdjService.saveHistories(historyList);
        return ResponseEntity.ok("히스토리 저장 완료");
    }

//    가게 영업시간 가져오기(통계페이지)
//    @GetMapping("/restaurant/info")
//    public ResponseEntity<Map<String, String>> getResTime(@RequestParam int resIdx){
//        Map<String, String> resTime = jdjService.getResTime(resIdx);
//        return ResponseEntity.ok(resTime);
//    }

//    가게 예약 시간대 불러오기(메인)
    @GetMapping("/restaurant/{resIdx}/reservationTime")
    public ResponseEntity<List<String>> getResTime(@PathVariable("resIdx") String resIdx) {
        String csv = jdjService.getResTime(resIdx).toString();
        System.out.println("가게예약시간대불러오기 컨트롤러 : " + csv);
        if (csv == null || csv.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        List<String> timeList = Arrays.asList(csv.split(","));
        return ResponseEntity.ok(timeList);
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

//  @GetMapping("/api/dummy/insert")
//  public String insertDummyData() {
//    dummyDataInsert.insertDummyData();
//    return "더미 데이터 삽입 완료!";
//  }
}
