//package com.example.team3_final_project_server.KimSangMin.controller;
//
//import com.example.team3_final_project_server.KimSangMin.mapper.OwnerMapper;
//import com.example.team3_final_project_server.KimSangMin.service.OwnerService;
//import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
//import com.example.team3_final_project_server.dto.OwnerDTO;
//import com.example.team3_final_project_server.dto.ResponseDTO;
//import com.example.team3_final_project_server.dto.UserDTO;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//public class OwnerController {
//
//    @Autowired
//    private OwnerService ownerService;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private OwnerMapper ownerMapper;
//
//    //  사장님 회원가입
//    @PostMapping("/pre/signup")
//    public ResponseEntity<PreResponse> signup(@RequestBody UserDTO user) {
//        try {
//            // 회원 가입 성공 시 성공 메시지 출력
//            String resData = ownerService.signupMember(user);
//
//            // 클라이언트에게 200 성공 신호와 성공 메시지를 전달
//            PreResponse response = new PreResponse(true, "가입 성공", resData);
//            return ResponseEntity.ok().body(response);
//        } catch (IllegalArgumentException e) {
//            // 회원 가입 실패 시 오류 메시지 출력
//            PreResponse response = new PreResponse(false, "가입 실패: " + e.getMessage(), null);
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//
//
//    //  사장님 로그인
//    @PostMapping("/pre/login")
//    public ResponseEntity<PreResponse> login(@RequestBody Map<String, String> userData) {
//        String userId = userData.get("userId");
//        String userPass = userData.get("userPass");
//
//        try {
//            ResponseDTO jwtToken = ownerService.getJwtAuthentication(userId, userPass);
//
//            // 로그인 성공 시 성공 메시지 및 JWT 토큰 반환
//            PreResponse response = new PreResponse(true, "로그인 성공", jwtToken.getAccessToken());
//            return ResponseEntity.ok().body(response);
//        } catch (AuthenticationException e) {
//            // 로그인 실패 시 오류 메시지 반환
//            PreResponse response = new PreResponse(false, "로그인 실패: " + e.getMessage(), null);
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//        }
//    }
//
//
//
//
//
//// 비밀번호 바꾸기
//@PutMapping("/pre/updatePassword")
//public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> body, Authentication auth) {
//    String userId = auth.getName();
//    String newPass = body.get("newPass");
//    System.out.println("userId : " + userId);
//    System.out.println("new Pass : " + newPass);
//
//    String hashed = passwordEncoder.encode(newPass);
//    ownerMapper.updatePassword(userId, hashed);
//    return ResponseEntity.ok("비밀번호 변경 완료");
//}
//
//// 정보 수정하기
//@PutMapping("/pre/updateInfo")
//public ResponseEntity<?> updateInfo(@RequestBody Map<String, String> body, Authentication auth) {
//    String userId = auth.getName();
//    String field = body.get("field");
//    String value = body.get("value");
//    System.out.println("userId : " + userId);
//    System.out.println("field : " + field);
//    System.out.println("value : " + value);
//
//    ownerMapper.updateField(userId, field, value);
//    return ResponseEntity.ok("회원 정보 수정 완료");
//}
//
//
//
//}
//
