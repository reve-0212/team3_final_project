package com.example.team3_final_project_server.KimSangMin.controller;

import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
import com.example.team3_final_project_server.KimSangMin.response.TimeRequest;
import com.example.team3_final_project_server.KimSangMin.service.PreService;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import com.example.team3_final_project_server.dto.TimeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PreController {

    @Autowired
    private PreService preService;

//    좌석저장
    @PostMapping("/seats/save")
    public ResponseEntity<PreResponse> saveSeats (@RequestBody List<SeatDTO> seats) {
        boolean success = preService.saveSeats(seats);

        if (success) {
            PreResponse response = new PreResponse(true,"저장 성공",seats);
            return ResponseEntity.ok(response);
        }
        else{
            PreResponse response = new PreResponse(false,"저장 실패",null);
            return ResponseEntity.badRequest().body(response);
        }
    }

//    좌석 정보 불러오기
    @GetMapping("/pre/loadSeat/{resIdx}")
    public ResponseEntity<PreResponse> loadSeat (@PathVariable int resIdx) {
        List<SeatDTO> seats = preService.loadSeat(resIdx);
        System.out.println("API 요청: " + resIdx);
        if (seats != null && !seats.isEmpty()) {
            PreResponse response = new PreResponse(true,"좌석 불러오기 성공",seats);
            return ResponseEntity.ok(response);
        }
        else{
            PreResponse response = new PreResponse(false,"좌석 불러오기 실패",null);
            return ResponseEntity.badRequest().body(response);
        }
    }

// 가게 정보 저장하기
    @PostMapping("/pre/resave")
    public ResponseEntity<PreResponse> reSave (@RequestBody RestaurantDTO restaurant) {
        boolean success = preService.reSave(restaurant);

        if (success) {
            PreResponse response = new PreResponse(true,"정보 저장 성공",restaurant);
            return ResponseEntity.ok(response);
        }
        else{
            PreResponse response = new PreResponse(false,"정보 저장 실패",null);
            return ResponseEntity.badRequest().body(response);
        }
    }


//    가게 정보 수정하기
@PutMapping("/pre/updateRest/{resIdx}")
public ResponseEntity<PreResponse> updateRest(
        @PathVariable("resIdx") int resIdx, // URL 경로에서 resIdx를 받음
        @RequestBody RestaurantDTO rest // 수정된 RestaurantDTO 객체를 받음
) {
    boolean success = preService.updateRest(resIdx, rest);

    if (success) {
        PreResponse response = new PreResponse(true, "가게 정보가 수정되었습니다.", rest);
        return ResponseEntity.ok(response);
    } else {
        PreResponse response = new PreResponse(false, "정보 수정 실패", null);
        return ResponseEntity.badRequest().body(response);
    }
}

// 가게 정보 불러오기
    @GetMapping("/pre/getRest/{resIdx}")
    public ResponseEntity<PreResponse> getRest(@PathVariable("resIdx") int resIdx) {
        RestaurantDTO rest = preService.getRest(resIdx);

        if (rest != null) {
            PreResponse response = new PreResponse(true, "가게 정보 조회 성공", rest);
            return ResponseEntity.ok(response);
        } else {
            PreResponse response = new PreResponse(false, "가게 정보 조회 실패", null);
            return ResponseEntity.badRequest().body(response);
        }
    }




// 가게 시간 지정하기
    @PostMapping("/pre/timeset")
    public ResponseEntity<PreResponse> setTime (@RequestBody TimeRequest timeRequest) {
        List<TimeDTO> timeList = timeRequest.getTimeList();
        boolean success = preService.insertTime(timeList);

        if (success) {
            PreResponse response = new PreResponse(true,"시간 저장 성공",timeList);
            return ResponseEntity.ok(response);
        }
        else{
            PreResponse response = new PreResponse(false,"시간 저장 실패",null);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
