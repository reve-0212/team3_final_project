package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.ResponseDTO;
import com.example.team3_final_project_server.dto.RestaurantListDTO;
import com.example.team3_final_project_server.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jsy")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class JSYController {

  @Autowired
  private JSYService jsyService;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;

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
  @GetMapping("/contents/{category}")
  public List<RestaurantListDTO> getRstListByCategory(@PathVariable("category") String category) throws Exception {
//    System.out.println(" /contents/{category} 받아온 값 : " + category);
    return jsyService.getRstListByCategory(category);
  }

  @GetMapping("/owner/login")
  public ResponseEntity<?> getOwnerLoginCheck(@RequestParam String ownerId, @RequestParam String ownerPw) {
    try {
      ResponseDTO jwtToken = jsyService.getJwtOwnerLoginCheck(ownerId, ownerPw);
      System.out.println("OwnerLogin");
      return ResponseEntity.ok().body(jwtToken);
    } catch (AuthenticationException e) {
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

//  @PostMapping("/refresh")
//  public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> refreshTokenRequest) {
//    String refreshToken = refreshTokenRequest.get("refreshToken");
//
//    System.out.println("refreshToken : " + refreshToken);
//
//    try {
//      // 리프레시 토큰을 사용하여 새로운 액세스 토큰 생성
//      String newAccessToken = jwtTokenProvider.refreshAccessToken(refreshToken);
//
//      // 기존의 JWT를 통해 사용자 정보 추출
//      Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
//      UserDTO user = (UserDTO) authentication.getPrincipal();
//
//      // 새로운 액세스 토큰과 사용자 정보 포함한 ResponseDTO 반환
//      ResponseDTO<?> response = ResponseDTO.builder()
//              .accessToken(newAccessToken)
//              .refreshToken(refreshToken)  // 원래의 리프레시 토큰도 함께 반환
//              .userIdx(user.getUserIdx())
//              .userId(user.getUserId())
//              .userNick(user.getUserNick())
//              .userCall(user.getUserCall())
//              .userEmail(user.getUserEmail())
//              .role(user.getRole())
//              .bsName(user.getBsName())
//              .bsNumber(user.getBsNumber())
//              .build();
//
//      return ResponseEntity.ok(response);
//
//    } catch (RuntimeException e) {
//      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid or expired refresh token");
//    }
//  }

}