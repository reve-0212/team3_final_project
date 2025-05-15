package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
import com.example.team3_final_project_server.KimSangMin.service.PreService;
import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import com.example.team3_final_project_server.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pre")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class JSYController {

  @Autowired
  private JSYService jsyService;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  @Autowired
  private PreService preService;

//  @GetMapping("/contents/{category}")
//  public List<RestaurantListDTO> getRstListByCategory(@PathVariable("category") String category) throws Exception {
  ////    System.out.println(" /contents/{category} 받아온 값 : " + category);
//    return jsyService.getRstListByCategory(category);
//  }
  @GetMapping("/admin/login")
  public ResponseEntity<?> getAdminLoginCheck(@RequestParam String adminId, @RequestParam String adminPw){
    try{
      ResponseDTO jwtToken = jsyService.getJwtAdminLoginCheck(adminId, adminPw);
      System.out.println("어드민 로그인");
      return ResponseEntity.ok().body(jwtToken);
    }catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
    }
  }

  @PostMapping("/admin/SaveOwnerInfo")
  public ResponseEntity<?> SaveOwnerInfo(@RequestBody UserDTO user){
    try{
      String resData = jsyService.SaveOwnerInfo(user);

      return ResponseEntity.ok().body(resData);

    }catch (IllegalArgumentException e){
      String resData = "사장 정보 기입 실패 \n" + e.getMessage();
      return ResponseEntity.badRequest().body(resData);
    }
  }

  @GetMapping("/reservations")
  public ResponseEntity<?> getReservations(@RequestParam String seatId, Authentication authentication){

    System.out.println("controller에서 나온값 : " + authentication);
    try{

      String role = authentication.getAuthorities().iterator().next().getAuthority();
      System.out.println("요청한 사용자 역할: " + role);


      List<ReservationDTO> resData = jsyService.getResList(seatId);
      return ResponseEntity.ok().body(resData);
    }catch (Exception e){
      String resData = e.getMessage();
      return ResponseEntity.badRequest().body(resData);
    }
  }


  //    좌석 정보 불러오기
  @GetMapping("/TodayLoadSeat/{resIdx}")
  public ResponseEntity<PreResponse> TodayLoadSeat (@PathVariable String resIdx) {
    List<SeatDTO> seats = jsyService.TodayLoadSeat(resIdx);
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
    Optional<Integer> resIdx = jsyService.findResIdxByUser(userIdx);


    if (resIdx.isPresent()) {
      return ResponseEntity.ok().body(resIdx.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body("등록된 레스토랑이 없습니다.");
    }
  }


  @PutMapping("/reservation/status")
  public ResponseEntity<String> updateStatus(@RequestBody ReservationDTO dto) {
    System.out.println(dto);
    boolean success = jsyService.updateReservationStatus(dto);
    return success ? ResponseEntity.ok("상태 업데이트 완료") :
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패");
  }

  // 전체 resIdx 기준으로 예약목록리스트 들고오기
  @GetMapping("/reservations/all")
  public ResponseEntity<List<ReservationDTO>> getAllReservations(@RequestParam String resIdx) {
    List<ReservationDTO> reservations = jsyService.findAllByResIdx(resIdx);
    return ResponseEntity.ok(reservations);
  }


  @GetMapping("/Pastreservations/{resIdx}")
  public ResponseEntity<List<ReservationDTO>> getPastReservations(@PathVariable String resIdx) {
    List<ReservationDTO> list = jsyService.getPastReservations(resIdx);
    return ResponseEntity.ok(list);
  }

}