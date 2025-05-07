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

  @GetMapping("/api/auth/login")
  public ResponseEntity<?> login(@RequestParam String userId, @RequestParam String userPass) {

//    예외처리를 이용하여 사용자 인증을 안전하게 실행
    try {
//      사용자 인정 정보 및 jwt 토큰 정보를 가져오기
//      ResponseDTO에는 jwt를 통해서 생성된 엑세스 토큰과 리플레시 토큰이 저장되어 있음
      ResponseDTO jwtToken = memberService.getJwtAuthentication(userId, userPass);

      System.out.println("authLogin");
//      가져온 jwt 토큰 정보를 클라이언트로 전달
      return ResponseEntity.ok().body(jwtToken);
    }
//    사용자 인증 실패 시 401 오류 및 메시지 출력
    catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
    }
  }


  @PostMapping("/getUserData")
  public UserDTO getUserData(@RequestParam("userId") String userId, @RequestParam("userPass") String userPass) {
    System.out.println(sjhServiceImpl.getUserData(userId, userPass));
    return sjhServiceImpl.getUserData(userId, userPass);
  }

//  @GetMapping("/api/auth/login")
//  @ResponseBody
//  public UserDTO login(@RequestParam String userId, @RequestParam String userPass) {
//    try{
//      UserDTO user = memberService.validateUser(userId, userPass);
//      user.setUserPass(null);
//      System.out.println(userId);
//      System.out.println(userPass);
//      System.out.println(user);
//      return user;
//    } catch (AuthenticationException | IllegalArgumentException e){
//      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
//    }
//  }
}
