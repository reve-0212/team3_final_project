package com.example.team3_final_project_server.KimSangMin.controller;

import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
import com.example.team3_final_project_server.KimSangMin.service.PreService;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import com.example.team3_final_project_server.dto.SeatSaveRequest;
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


}
