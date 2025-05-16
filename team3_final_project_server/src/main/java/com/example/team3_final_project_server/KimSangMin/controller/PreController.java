package com.example.team3_final_project_server.KimSangMin.controller;

import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
import com.example.team3_final_project_server.KimSangMin.response.TimeRequest;
import com.example.team3_final_project_server.KimSangMin.service.PreService;
import com.example.team3_final_project_server.dto.*;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PreController {

  @Autowired
  private PreService preService;


  //    좌석저장
  @PostMapping("/pre/owner/seats/save")
  public ResponseEntity<PreResponse> saveSeats(@RequestBody List<SeatDTO> seats, @RequestHeader("Authorization") String authorization) {
    try {
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();

      Integer resIdx = preService.findResIdx(userIdx);
      if (resIdx == null) {
        return ResponseEntity.badRequest()
                .body(new PreResponse(false, "가게 정보가 없습니다.", null));
      }

      for (SeatDTO seat : seats) {
        seat.setResIdx(resIdx);
      }

      boolean success = preService.saveSeats(seats);

      if (success) {
        PreResponse response = new PreResponse(true, "저장 성공", seats);
        return ResponseEntity.ok(response);
      } else {
        PreResponse response = new PreResponse(false, "저장 실패", null);
        return ResponseEntity.badRequest().body(response);
      }
    } catch (Exception e) {
      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
  }

  //    좌석 정보 불러오기
  @GetMapping("/pre/owner/seats/load")
  public ResponseEntity<PreResponse> loadSeat(@RequestHeader("Authorization") String authorization) {
    try {
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
//            userIdx 찾기
      int userIdx = jwtInfo.getUserIdx();

//            userIdx로 resIdx 찾기
      int resIdx = preService.findResIdx(userIdx);

      List<SeatDTO> seats = preService.loadSeat(resIdx);

      if (seats != null && !seats.isEmpty()) {
        PreResponse response = new PreResponse(true, "좌석 불러오기 성공", seats);
        return ResponseEntity.ok(response);
      } else {
        PreResponse response = new PreResponse(false, "좌석 불러오기 실패", null);
        return ResponseEntity.badRequest().body(response);
      }
    } catch (Exception e) {
      e.printStackTrace();  // 예외를 출력하거나 로깅
      PreResponse response = new PreResponse(false, "서버 오류 발생", null);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
  }

  //    좌석 정보 수정하기
  @PutMapping("/pre/owner/seats/update")
  public ResponseEntity<PreResponse> updateSeat(@RequestBody(required = false) SeatDTO seat, @RequestHeader("Authorization") String authorization) {
    try {
      // Authorization 헤더에서 Bearer를 제거하고 JWT 토큰만 추출
      if (authorization != null && authorization.startsWith("Bearer ")) {
        String token = authorization.substring(7); // "Bearer "를 제외한 토큰 부분만 추출
        ResponseDTO jwtInfo = preService.tokenCheck(token);  // 추출된 토큰을 검증
        int userIdx = jwtInfo.getUserIdx();  // 사용자 ID 추출

        // 가게 정보 확인
        Integer resIdx = preService.findResIdx(userIdx);
        if (resIdx == null) {
          return ResponseEntity.badRequest()
                  .body(new PreResponse(false, "가게 정보가 없습니다.", null));
        }

        // 좌석 업데이트를 위한 가게 정보 설정
        if (seat.getResIdx() == null) {
          seat.setResIdx(resIdx);  // resIdx가 없으면 자동으로 세팅
        }

        // 좌석 업데이트 수행
        boolean success = preService.updateSeats(seat);

        // 성공 여부에 따라 응답 반환
        if (success) {
          PreResponse response = new PreResponse(true, "좌석 업데이트 성공", seat);
          return ResponseEntity.ok(response);
        } else {
          PreResponse response = new PreResponse(false, "좌석 업데이트 실패", null);
          return ResponseEntity.badRequest().body(response);
        }
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new PreResponse(false, "토큰 형식이 잘못되었습니다.", null));
      }
    } catch (Exception e) {
      // 예외 발생 시 응답
      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
  }


  //    좌석 삭제하기
  @DeleteMapping("/pre/owner/seats/delete/{seatId}")
  public ResponseEntity<PreResponse> deleteSeat(@PathVariable Integer seatId, @RequestHeader("Authorization") String authorization) {
    try {
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();

      Integer resIdx = preService.findResIdx(userIdx);
      if (resIdx == null) {
        PreResponse response = new PreResponse(false, "데이터 삭제 실패", null);
        return ResponseEntity.badRequest().body(response);
      }

      boolean success = preService.deleteSeate(seatId, resIdx);

      if (success) {
        PreResponse response = new PreResponse(true, "데이터 삭제 성공", null);
        return ResponseEntity.ok(response);
      } else {
        PreResponse response = new PreResponse(true, "데이터 삭제 실패", null);
        return ResponseEntity.badRequest().body(response);
      }
    } catch (Exception e) {
      PreResponse response = new PreResponse(false, "유효하지 않은 토큰입니다.", null);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
  }

  // 가게 정보 저장하기
  @PostMapping("/pre/owner/resave")
  public ResponseEntity<PreResponse> reSave(@RequestBody RestaurantDTO restaurant, @RequestHeader("Authorization") String authorization) {
    try {
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);

      restaurant.setUserIdx(jwtInfo.getUserIdx());

      // 저장 처리
      boolean success = preService.reSave(restaurant);

      if (success) {
        PreResponse response = new PreResponse(true, "정보 저장 성공", restaurant);
        return ResponseEntity.ok(response);
      } else {
        PreResponse response = new PreResponse(false, "정보 저장 실패", null);
        return ResponseEntity.badRequest().body(response);
      }
    } catch (Exception e) {
      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
  }

  // 가게 카테고리 저장하기
  @PostMapping("/pre/owner/saveCate")
  public ResponseEntity<PreResponse> cateSave(@RequestBody CategoryDTO category,
                                              @RequestHeader("Authorization") String authorization) {
    try {
      if (category == null) {
        return ResponseEntity.badRequest().body(new PreResponse(false, "카테고리 데이터가 없습니다", null));
      }

      String token = null;
      if (authorization != null && authorization.startsWith("Bearer ")) {
        token = authorization.substring(7);
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new PreResponse(false, "토큰 형식이 올바르지 않습니다", null));
      }

      ResponseDTO jwtInfo = preService.tokenCheck(token);
      int userIdx = jwtInfo.getUserIdx();

      Integer resIdx = preService.findResIdx(userIdx);
      category.setResIdx(resIdx);

      boolean success = preService.cateSave(category);

      if (success) {
        return ResponseEntity.ok(new PreResponse(true, "정보 저장 성공", category));
      } else {
        return ResponseEntity.badRequest().body(new PreResponse(false, "정보 저장 실패", null));
      }
    } catch (Exception e) {
      e.printStackTrace();  // 여기서 에러 로그 꼭 확인하세요!
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
    }
  }

  //  카테고리 수정하기
  @PutMapping("/pre/owner/updateCate")
  public ResponseEntity<PreResponse> updateCate(@RequestBody CategoryDTO category, @RequestHeader("Authorization") String authorization) {
    try {
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();

      Integer resIdx = preService.findResIdx(userIdx);
      category.setResIdx(resIdx);

//      가게정보에 저장된 카테고리가 있는지 확인
      boolean exists = preService.existsCate(resIdx);

      if (!exists) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new PreResponse(false, "수정할 카테고리가 존재하지 않습니다.", null));
      }

      boolean success = preService.updateCate(category);
      if (success) {
        return ResponseEntity.ok(new PreResponse(true, "수정 성공", category));
      }
      else{
        return ResponseEntity.badRequest().body(new PreResponse(false, "수정 실패", null));
      }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
    }
  }


//  가게 카테고리 불러오기
  @GetMapping("/pre/owner/getCate")
  public ResponseEntity<PreResponse> getCate(@RequestHeader("Authorization") String authorization) {
    try {
      String token = null;
      if (authorization != null && authorization.startsWith("Bearer ")) {
        token = authorization.substring(7);
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new PreResponse(false, "토큰 형식이 올바르지 않습니다", null));
      }

      ResponseDTO jwtInfo = preService.tokenCheck(token);
      int userIdx = jwtInfo.getUserIdx();

      Integer resIdx = preService.findResIdx(userIdx);

      if (resIdx == null) {
        return ResponseEntity.badRequest().body(new PreResponse(false, "<저장된 정보가 없습니다.>", null));
      }

      CategoryDTO category = preService.getResIdxByCate(resIdx);

      if (category != null) {
        return ResponseEntity.ok(new PreResponse(true, "정보 저장 성공", category));
      } else {
        return ResponseEntity.badRequest().body(new PreResponse(false, "정보 저장 실패", null));
      }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
    }
  }



//  가게 카테고리 수정하기
//  @PutMapping("/pre/owner/update")



  // 가게 정보 불러오기
  @GetMapping("/pre/owner/getRestaurant")
  public ResponseEntity<PreResponse> getRest(@RequestHeader("Authorization") String authorization) {
    try {
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();

      RestaurantDTO restaurant = preService.getRestByUserIdx(userIdx);

      if (restaurant != null) {
        PreResponse response = new PreResponse(true, "가게 정보 조회 성공", restaurant);
        return ResponseEntity.ok(response);
      } else {
        PreResponse response = new PreResponse(false, "가게 정보 조회 실패", null);
        return ResponseEntity.badRequest().body(response);
      }
    }
    catch (Exception e){
      PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
  }

  //    가게 정보 수정하기
  @PutMapping("/pre/owner/updateRest/{resIdx}")
  public ResponseEntity<PreResponse> updateRest(
          @PathVariable int resIdx,
          @RequestHeader("Authorization") String authorization,
          @RequestBody RestaurantDTO storeData) {

    try {
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();

      // 가게가 있는지 확인
      RestaurantDTO existingRest = preService.getRestByUserIdx(userIdx);
      if (existingRest == null || existingRest.getResIdx() != resIdx) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new PreResponse(false, "본인의 가게가 아니거나 존재하지 않습니다.", null));
      }

      // 가게 정보 업데이트 처리 (서비스 메서드 필요)
      boolean updateResult = preService.updateRest(resIdx, storeData);

      if (updateResult) {
        RestaurantDTO updatedRest = preService.getRestByUserIdx(userIdx);
        return ResponseEntity.ok(new PreResponse(true, "가게 정보 수정 성공", updatedRest));
      } else {
        return ResponseEntity.badRequest()
                .body(new PreResponse(false, "가게 정보 수정 실패", null));
      }

    } catch (Exception e) {
      System.out.println("[ERROR] 인증 오류 또는 예외 발생 : " + e.getMessage());
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
    }
  }

  // 가게 시간 지정하기
  @PostMapping("/pre/owner/saveTime")
  public ResponseEntity<PreResponse> setTime (@RequestBody List<TimeDTO> times,
  @RequestHeader("Authorization") String authorization) {
  try{
    ResponseDTO jwtInfo = preService.tokenCheck(authorization);
    int userIdx = jwtInfo.getUserIdx();

    Integer resIdx = preService.findResIdx(userIdx);
    if (resIdx == null) {
      return ResponseEntity.badRequest().body(new PreResponse(false, "<저장된 정보가 없습니다.>", null));
    }
boolean success = preService.setTime(resIdx,times);
    if (success) {
      PreResponse response = new PreResponse(true, "정보 저장 성공", times);
      return ResponseEntity.ok(response);
    } else {
      PreResponse response = new PreResponse(false, "정보 저장 실패", null);
      return ResponseEntity.badRequest().body(response);
    }
  } catch (Exception e) {
    PreResponse response = new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }
  }

//  가게 운영시간 수정하기
@PutMapping("/pre/owner/updateTime")
public ResponseEntity<PreResponse> updateTime(@RequestBody List<TimeDTO> times,
                                              @RequestHeader("Authorization") String authorization) {
  try {
    ResponseDTO jwtInfo = preService.tokenCheck(authorization);
    int userIdx = jwtInfo.getUserIdx();

    Integer resIdx = preService.findResIdx(userIdx);
    if (resIdx == null) {
      return ResponseEntity.badRequest().body(new PreResponse(false, "<저장된 정보가 없습니다.>", null));
    }

    boolean success = preService.updateTime(resIdx, times);

    if (success) {
      return ResponseEntity.ok(new PreResponse(true, "정보 수정 성공", times));
    } else {
      return ResponseEntity.badRequest().body(new PreResponse(false, "정보 수정 실패", null));
    }
  } catch (Exception e) {
    e.printStackTrace();
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
  }
}

// 가게 운영시간 불러오기
  @GetMapping("/pre/owner/getTime")
  public ResponseEntity<PreResponse> getTime(@RequestHeader("Authorization") String authorization) {
    try{
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();
      Integer resIdx = preService.findResIdx(userIdx);
      if (resIdx == null) {
        return ResponseEntity.badRequest().body(new PreResponse(false, "<저장된 정보가 없습니다.>", null));
      }

      List<TimeDTO> time = preService.getTimeByResIdx(resIdx);

      if (time != null) {
        return ResponseEntity.ok(new PreResponse(true, "정보 불러오가 성공", time));
      } else {
        return ResponseEntity.badRequest().body(new PreResponse(false, "정보 불러오기 실패", null));
      }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
    }
  }

//  가게 운영시간 볼 수 있도록하기.
  @GetMapping("/pre/owner/seeTime")
  public ResponseEntity<PreResponse> seeTime(@RequestHeader("Authorization") String authorization) {
    try{
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();
      Integer resIdx = preService.findResIdx(userIdx);
      if (resIdx == null) {
        return ResponseEntity.badRequest().body(new PreResponse(false, "<저장된 정보가 없습니다.>", null));
      }

      List<TimeDTO> time = preService.getTimeByResIdx(resIdx);

      if (time != null) {
        return ResponseEntity.ok(new PreResponse(true, "정보 불러오가 성공", time));
      } else {
        return ResponseEntity.badRequest().body(new PreResponse(false, "정보 불러오기 실패", null));
      }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
    }
  }

// 편의시설 목록 가져오기
  @GetMapping("/pre/owner/funcOpt")
  public ResponseEntity<PreResponse> funcOpt(@RequestHeader("Authorization") String authorization) {
    try{
      ResponseDTO jwtInfo = preService.tokenCheck(authorization);
      int userIdx = jwtInfo.getUserIdx();

      List<ConvenientDTO> func = preService.getFunc();
      return ResponseEntity.ok(new PreResponse(true, "편의 시설 목록 조회 성공", func));
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new PreResponse(false, "토큰이 유효하지 않거나 인증 실패", null));
    }
    }
  }

//  사장 편의시설 저장하기
//@PostMapping("/pre/owner/saveFunc")
//public ResponseEntity<PreResponse> saveFunc
