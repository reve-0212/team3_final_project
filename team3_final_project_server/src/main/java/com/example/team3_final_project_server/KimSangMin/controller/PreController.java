//package com.example.team3_final_project_server.KimSangMin.controller;
//
//import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
//import com.example.team3_final_project_server.KimSangMin.response.TimeRequest;
//import com.example.team3_final_project_server.KimSangMin.service.PreService;
//import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
//import com.example.team3_final_project_server.dto.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//public class PreController {
//
//  @Autowired
//  private PreService preService;
//
//  @Autowired
//  private JwtTokenProvider jwtTokenProvider;
//
//  //    좌석저장
//  @PostMapping("/pre/seats/save")
//  public ResponseEntity<PreResponse> saveSeats (@RequestBody List<SeatDTO> seats, @RequestHeader("Authorization") String authorization) {
//    try {
//      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
//      int userIdx = jwtInfo.getUserIdx();
//
//      Integer resIdx = preService.findResIdx(userIdx);
//      if (resIdx == null) {
//        return ResponseEntity.badRequest()
//                .body(new PreResponse(false, "가게 정보가 없습니다.", null));
//      }
//
//      for (SeatDTO seat : seats) {
//        seat.setResIdx(resIdx);
//      }
//
//      boolean success = preService.saveSeats(seats);
//
//      if (success) {
//        PreResponse response = new PreResponse(true, "저장 성공", seats);
//        return ResponseEntity.ok(response);
//      } else {
//        PreResponse response = new PreResponse(false, "저장 실패", null);
//        return ResponseEntity.badRequest().body(response);
//      }
//    }
//    catch (Exception e){
//      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
//      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//  }
//
//  //    좌석 정보 불러오기
//  @GetMapping("/pre/seats/load")
//  public ResponseEntity<PreResponse> loadSeat (@RequestHeader("Authorization") String authorization) {
//    try {
//      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
////            userIdx 찾기
//      int userIdx = jwtInfo.getUserIdx();
//
////            userIdx로 resIdx 찾기
//      int resIdx = preService.findResIdx(userIdx);
//
//      List<SeatDTO> seats = preService.loadSeat(resIdx);
//
//      if (seats != null && !seats.isEmpty()) {
//        PreResponse response = new PreResponse(true, "좌석 불러오기 성공", seats);
//        return ResponseEntity.ok(response);
//      } else {
//        PreResponse response = new PreResponse(false, "좌석 불러오기 실패", null);
//        return ResponseEntity.badRequest().body(response);
//      }
//    }
//    catch (Exception e){
//      e.printStackTrace();  // 예외를 출력하거나 로깅
//      PreResponse response = new PreResponse(false, "서버 오류 발생", null);
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//    }
//  }
//
//  //    좌석 정보 수정하기
//  @PutMapping("/pre/seats/update")
//  public ResponseEntity<PreResponse> updateSeat (@RequestBody List<SeatDTO> seats, @RequestHeader("Authorization") String authorization) {
//    try {
//      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
//      int userIdx = jwtInfo.getUserIdx();
//
//      Integer resIdx = preService.findResIdx(userIdx);
//      if (resIdx == null) {
//        return ResponseEntity.badRequest()
//                .body(new PreResponse(false, "가게 정보가 없습니다.", null));
//      }
//
//      // 좌석 업데이트를 위한 가게 정보 설정
//      for (SeatDTO seat : seats) {
//        seat.setResIdx(resIdx);
//      }
//
//      // 좌석 업데이트 수행
//      boolean success = preService.updateSeats(seats);
//
//      // 성공 여부에 따라 응답 반환
//      if (success) {
//        PreResponse response = new PreResponse(true, "좌석 업데이트 성공", seats);
//        return ResponseEntity.ok(response);
//      } else {
//        PreResponse response = new PreResponse(false, "좌석 업데이트 실패", null);
//        return ResponseEntity.badRequest().body(response);
//      }
//    } catch (Exception e) {
//      // 예외 발생 시 응답
//      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
//      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//  }
//  //    좌석 삭제하기
//  @DeleteMapping("/pre/seats/delete/{seatId}")
//  public ResponseEntity<PreResponse> deleteSeat(@PathVariable Integer  seatId, @RequestHeader("Authorization") String authorization) {
//    try {
//      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
//      int userIdx = jwtInfo.getUserIdx();
//
//      Integer resIdx = preService.findResIdx(userIdx);
//      if (resIdx == null) {
//        PreResponse response = new PreResponse(false, "데이터 삭제 실패", null);
//        return ResponseEntity.badRequest().body(response);
//      }
//
//      boolean success = preService.deleteSeate(seatId, resIdx);
//
//      if (success) {
//        PreResponse response = new PreResponse(true, "데이터 삭제 성공", null);
//        return ResponseEntity.ok(response);
//      } else {
//        PreResponse response = new PreResponse(true, "데이터 삭제 실패", null);
//        return ResponseEntity.badRequest().body(response);
//      }
//    } catch (Exception e){
//      PreResponse response = new PreResponse(false, "유효하지 않은 토큰입니다.", null);
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//    }
//  }
//
//  // 가게 정보 저장하기
//  @PostMapping("/pre/resave")
//  public ResponseEntity<PreResponse> reSave(@RequestBody RestaurantDTO restaurant, @RequestHeader("Authorization") String authorization) {
//    try {
//      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
//
//      restaurant.setUserIdx(jwtInfo.getUserIdx());
//
//      // 저장 처리
//      boolean success = preService.reSave(restaurant);
//
//      if (success) {
//        PreResponse response = new PreResponse(true, "정보 저장 성공", restaurant);
//        return ResponseEntity.ok(response);
//      } else {
//        PreResponse response = new PreResponse(false, "정보 저장 실패", null);
//        return ResponseEntity.badRequest().body(response);
//      }
//    } catch (Exception e) {
//      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
//      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//  }
//
//  // 가게 정보 불러오기
//  @GetMapping("/pre/getRestaurant")
//  public ResponseEntity<PreResponse> getRest(@RequestHeader("Authorization") String authorization) {
//    try {
//      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
//      int userIdx = jwtInfo.getUserIdx();
//
//      RestaurantDTO restaurant = preService.getRestByUserIdx(userIdx);
//
//      if (restaurant != null) {
//        PreResponse response = new PreResponse(true, "가게 정보 조회 성공", restaurant);
//        return ResponseEntity.ok(response);
//      } else {
//        PreResponse response = new PreResponse(false, "가게 정보 조회 실패", null);
//        return ResponseEntity.badRequest().body(response);
//      }
//    }
//    catch (Exception e){
//      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
//      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//  }
//
//  //    가게 정보 수정하기
//  @PutMapping("/pre/updateRest/{resIdx}")
//  public ResponseEntity<PreResponse> updateRest(
//          @PathVariable("resIdx") int resIdx, // URL 경로에서 resIdx를 받음
//          @RequestBody RestaurantDTO rest // 수정된 RestaurantDTO 객체를 받음
//  ) {
//    boolean success = preService.updateRest(resIdx, rest);
//
//    if (success) {
//      PreResponse response = new PreResponse(true, "가게 정보가 수정되었습니다.", rest);
//      return ResponseEntity.ok(response);
//    } else {
//      PreResponse response = new PreResponse(false, "정보 수정 실패", null);
//      return ResponseEntity.badRequest().body(response);
//    }
//  }
//
//  // 가게 시간 지정하기
//  @PostMapping("/pre/timeset")
//  public ResponseEntity<PreResponse> setTime (@RequestBody TimeRequest timeRequest) {
//    List<TimeDTO> timeList = timeRequest.getTimeList();
//    boolean success = preService.insertTime(timeList);
//
//    if (success) {
//      PreResponse response = new PreResponse(true,"시간 저장 성공",timeList);
//      return ResponseEntity.ok(response);
//    }
//    else{
//      PreResponse response = new PreResponse(false,"시간 저장 실패",null);
//      return ResponseEntity.badRequest().body(response);
//    }
//  }
//}