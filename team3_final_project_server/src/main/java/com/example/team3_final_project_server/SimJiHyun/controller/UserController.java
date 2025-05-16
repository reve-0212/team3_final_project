package com.example.team3_final_project_server.SimJiHyun.controller;

import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
import com.example.team3_final_project_server.SimJiHyun.mapper.UserMapper;
import com.example.team3_final_project_server.SimJiHyun.service.UserService;
import com.example.team3_final_project_server.dto.*;
import com.example.team3_final_project_server.dto.join.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequiredArgsConstructor
public class UserController {
  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserMapper userMapper;

  //  로그인
  @GetMapping("/api/auth/login")
  public ResponseEntity<?> login(@RequestParam String userId, @RequestParam String userPass) {

//    예외처리를 이용하여 사용자 인증을 안전하게 실행
    try {
//      사용자 인정 정보 및 jwt 토큰 정보를 가져오기
//      ResponseDTO에는 jwt를 통해서 생성된 엑세스 토큰과 리플레시 토큰이 저장되어 있음
      ResponseDTO jwtToken = userService.getJwtAuthentication(userId, userPass);
//      가져온 jwt 토큰 정보를 클라이언트로 전달
      return ResponseEntity.ok().body(jwtToken);
    }
//    사용자 인증 실패 시 401 오류 및 메시지 출력
    catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
    }
  }

  //  회원 가입, 클라이언트와의 데이터 전달을 위해 UserDTO 클래스를 사용
  @PostMapping("/api/auth/signup")
  public ResponseEntity<?> signup(@RequestBody UserDTO user) {
//    예외처리를 통해서 안전하게 회원 가입 실행
    try {
//      회원 가입 성공 시 성공 메시지 출력
      String resData = userService.signupMember(user);

//      클라이언트에게 200 성공 신호와 성공 메시지를 전달
      return ResponseEntity.ok().body(resData);
    }
//    회원 가입 실패 시 오류 메시지 출력
    catch (IllegalArgumentException e) {
      String resData = "회원 가입 실패\n" + e.getMessage();
      return ResponseEntity.badRequest().body(resData);
    }
  }

  //  비밀번호 바꾸기
  @PutMapping("/api/auth/updatePassword")
  public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> body, Authentication auth) {
    String userId = auth.getName();
    String newPass = body.get("newPass");
    System.out.println("userId : " + userId);
    System.out.println("new Pass : " + newPass);

    String hashed = passwordEncoder.encode(newPass);
    userMapper.updatePassword(userId, hashed);
    return ResponseEntity.ok("비밀번호 변경 완료");
  }

  //  정보 수정하기
  @PutMapping("/api/user/updateInfo")
  public ResponseEntity<?> updateInfo(@RequestBody Map<String, String> body, Authentication auth) {
    String userId = auth.getName();
    String field = body.get("field");
    String value = body.get("value");
    System.out.println("userId : " + userId);
    System.out.println("field : " + field);
    System.out.println("value : " + value);

    userMapper.updateField(userId, field, value);
    return ResponseEntity.ok("회원 정보 수정 완료");
  }

  //  예약 정보 리스트 가져오기
  @GetMapping("/userReservation")
  public List<ReservationRestaurantJoinDTO> userReservation(@RequestParam int userIdx) {
    return userService.userReservation(userIdx);
  }

  //  예약 상세 정보 가져오기(메뉴 제외)
  @GetMapping("/getBook")
  public ReservationRestaurantJoinDTO getBook(@RequestParam int reservationIdx, @RequestParam int restaurantIdx) {
    System.out.println("reservationIdx : " + reservationIdx);
    System.out.println("restaurantIdx : " + restaurantIdx);
    return userService.getBook(reservationIdx, restaurantIdx);
  }

  //  예약 메뉴 정보 가져오기
  @GetMapping("/getMenu")
  public List<RrsmDTO> getMenu(@RequestParam int reservationIdx, @RequestParam int restaurantIdx) {
    System.out.println("reservationIdx : " + reservationIdx);
    System.out.println("restaurantIdx : " + restaurantIdx);
    return userService.getMenu(reservationIdx, restaurantIdx);
  }

  //  예약 취소하기
  @PutMapping("/cancelBook")
  public void cancelBook(@RequestParam int reservationIdx) {
    System.out.println("reservationIdx : " + reservationIdx);
    userService.cancelBook(reservationIdx);
  }

  //  예약 취소할 때 히스토리에 넣기
  @PutMapping("/cancelBookHistory")
  public void cancelBookHistory(@RequestParam int reservationIdx) {
    System.out.println("reservationIdx : " + reservationIdx);
    userService.cancelBookHistory(reservationIdx);
  }

  //  예약 번호 찾기
  @GetMapping("/searchResIdx")
  public int searchResIdx(@RequestParam int userIdx, @RequestParam int resIdx, @RequestParam String rsvDate, @RequestParam String rsvTime) {
    System.out.println("userIdx : " + userIdx);
    System.out.println("resIdx : " + resIdx);
    System.out.println("rsvDate : " + rsvDate);
    System.out.println("rsvTime : " + rsvTime);
    return userService.searchResIdx(userIdx, resIdx, rsvDate, rsvTime);
  }

  //  좌석 조회하기
  @GetMapping("/userLoadSeat/{useResIdx}")
  public ResponseEntity<PreResponse> loadSeat(@PathVariable int useResIdx) {
    List<SeatDTO> seats = userService.loadSeat(useResIdx);
//        System.out.println("API 요청: " + resIdx);

    if (seats != null && !seats.isEmpty()) {
      PreResponse response = new PreResponse(true, "좌석 불러오기 성공", seats);
      return ResponseEntity.ok(response);
    } else {
      PreResponse response = new PreResponse(false, "좌석 불러오기 실패", null);
      return ResponseEntity.badRequest().body(response);
    }
  }

  @PutMapping("/resSeat")
  public void resSeat(@RequestBody ReservationDTO reservationDTO) {
    System.out.println("userIdx : " + reservationDTO.getUserIdx());
    System.out.println("resIdx : " + reservationDTO.getResIdx());
  }

  //  좌석 예약하기
  @PutMapping("/reserveSeat")
  public void reserveSeat(@RequestParam int reservationIdx, @RequestParam int seatId) {
    System.out.println("reserveSeat");
    System.out.println("reservationIdx : " + reservationIdx);
    System.out.println("seatId : " + seatId);
    userService.reserveSeat(reservationIdx, seatId);
  }

  @PutMapping("/reserveMenu")
  public void reserveMenu(@RequestParam int reservationIdx,
                          @RequestParam int menuIdx,
                          @RequestParam int menuQuantity) {
    System.out.println("reserveMenu");

    System.out.println("reservationIdx : " + reservationIdx);
    System.out.println("menuIdx : " + menuIdx);
    System.out.println("menuQuantity : " + menuQuantity);
    userService.reserveMenu(reservationIdx, menuIdx, menuQuantity);
  }

  @GetMapping("/isSeatAvailable/{shortPathIdx}")
  public int isSeatAvailable(@PathVariable int shortPathIdx) {
    System.out.println("shortPathIdx : " + shortPathIdx);
    return userService.isSeatAvailable(shortPathIdx);
  }

  @GetMapping("/reservedSeat/{shortPathIdx}")
  public int reservedSeat(@PathVariable int shortPathIdx) {
    System.out.println("shortPathIdx : " + shortPathIdx);
    return userService.reservedSeat(shortPathIdx);
  }

  @GetMapping("/getStoreLocation")
  public List<RestaurantDTO> getStoreLocation() {
    return userService.getStoreLocation();
  }

  @GetMapping("/getReg")
  public ReservationDTO getReg(@RequestParam int reservationIdx) {
    return userService.getReg(reservationIdx);
  }

  @GetMapping("/getMenuInfo")
  public List<ReservationSelectedMenuMenuJoinDTO> getMenuInfo(@RequestParam int reservationIdx) {
    return userService.getMenuInfo(reservationIdx);
  }

  @GetMapping("/getStoreInfo")
  public ReservationRestaurantJoinDTO getStoreInfo(@RequestParam int reservationIdx) {
    return userService.getStoreInfo(reservationIdx);
  }

  @PutMapping("/saveHistory")
  public void saveHistory(
          @RequestParam int reservationIdx,
          @RequestParam int resIdx,
          @RequestParam String reservationDate,
          @RequestParam int rsvPeople,
          @RequestParam int rsvMan,
          @RequestParam int rsvWoman,
          @RequestParam int rsvBaby,
          @RequestParam int menuIdx,
          @RequestParam String menuName,
          @RequestParam int menuPrice,
          @RequestParam int menuSCount,
          @RequestParam int menuSTP
  ) {
    System.out.print("reservationIdx : " + reservationIdx);
    System.out.print(" resIdx : " + resIdx);
    System.out.println(" reservationDate : " + reservationDate);

    System.out.print("rsvPeople : " + rsvPeople);
    System.out.print(" rsvMan : " + rsvMan);
    System.out.print(" rsvWoman : " + rsvWoman);
    System.out.println(" rsvBaby : " + rsvBaby);

    System.out.print("menuIdx : " + menuIdx);
    System.out.print(" menuName : " + menuName);
    System.out.print(" menuPrice : " + menuPrice);
    System.out.print(" menuSCount : " + menuSCount);
    System.out.print(" menuSTP : " + menuSTP);

    userService.saveHistory(reservationIdx, resIdx, reservationDate,
            rsvPeople, rsvMan, rsvWoman, rsvBaby,
            menuIdx, menuName, menuPrice, menuSCount, menuSTP);
  }

  @DeleteMapping("/deleteReservation")
  public void deleteReservation(@RequestParam int userIdx, @RequestParam int reservationIdx) {
    System.out.println("userIdx : " + userIdx);
    System.out.println("reservationIdx : " + reservationIdx);
    userService.deleteReservation(userIdx, reservationIdx);
  }

  @DeleteMapping("/deleteSeat")
  public void deleteSeat(@RequestParam int reservationIdx) {
    System.out.println("reservationIdx : " + reservationIdx);
    userService.deleteSeat(reservationIdx);
  }

  @PutMapping("/bookAllReg")
  public void bookAllReg(
          @RequestParam int userIdx,
          @RequestParam int resIdx,
          @RequestParam int rsvPeople,
          @RequestParam int rsvMan,
          @RequestParam int rsvWoman,
          @RequestParam int rsvBaby,
          @RequestParam String rsvDate,
          @RequestParam String rsvTime) {
    System.out.println("userIdx : " + userIdx);
    System.out.println("resIdx : " + resIdx);
    System.out.println("rsvPeople : " + rsvPeople);
    System.out.println("rsvMan : " + rsvMan);
    System.out.println("rsvWoman : " + rsvWoman);
    System.out.println("rsvBaby : " + rsvBaby);
    System.out.println("rsvDate : " + rsvDate);
    System.out.println("rsvTime : " + rsvTime);
    userService.bookAllReg(userIdx, resIdx, rsvPeople, rsvMan, rsvWoman, rsvBaby, rsvDate, rsvTime);
  }

  @GetMapping("/isSeatReserved")
  public List<Integer> isSeatReserved(@RequestParam String rsvDate, @RequestParam String rsvTime) {
    System.out.println("rsvDate : " + rsvDate);
    System.out.println("rsvTime : " + rsvTime);
    return userService.isSeatReserved(rsvDate, rsvTime);
  }
}
