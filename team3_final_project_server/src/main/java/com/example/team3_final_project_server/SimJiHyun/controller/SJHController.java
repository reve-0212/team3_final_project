package com.example.team3_final_project_server.SimJiHyun.controller;

import com.example.team3_final_project_server.SimJiHyun.service.MemberService;
import com.example.team3_final_project_server.SimJiHyun.service.SjhServiceImpl;
import com.example.team3_final_project_server.dto.ResponseDTO;
import com.example.team3_final_project_server.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
public class SJHController {

  @Autowired
  private SjhServiceImpl sjhServiceImpl;

  @Autowired
  private MemberService memberService;

  //  로그인
  @GetMapping("/api/auth/login")
  public ResponseEntity<?> login(@RequestParam String userId, @RequestParam String userPass) {

//    예외처리를 이용하여 사용자 인증을 안전하게 실행
    try {
//      사용자 인정 정보 및 jwt 토큰 정보를 가져오기
//      ResponseDTO에는 jwt를 통해서 생성된 엑세스 토큰과 리플레시 토큰이 저장되어 있음
      ResponseDTO jwtToken = memberService.getJwtAuthentication(userId, userPass);
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

    System.out.println("signup");

//    예외처리를 통해서 안전하게 회원 가입 실행
    try {
//      회원 가입 성공 시 성공 메시지 출력
      String resData = memberService.signupMember(user);

//      클라이언트에게 200 성공 신호와 성공 메시지를 전달
      return ResponseEntity.ok().body(resData);
    }
//    회원 가입 실패 시 오류 메시지 출력
    catch (IllegalArgumentException e) {
      String resData = "회원 가입 실패\n" + e.getMessage();
      return ResponseEntity.badRequest().body(resData);
    }
  }


  //  데이터 가져오기
  @PostMapping("/getUserData")
  public UserDTO getUserData(@RequestParam("userId") String userId, @RequestParam("userPass") String userPass) {
    System.out.println(sjhServiceImpl.getUserData(userId, userPass));
    return sjhServiceImpl.getUserData(userId, userPass);
  }


}
