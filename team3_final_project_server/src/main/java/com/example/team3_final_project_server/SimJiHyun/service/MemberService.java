//package com.example.team3_final_project_server.SimJiHyun.service;
//
//import com.example.team3_final_project_server.SimJiHyun.mapper.UserMapper;
//import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
//import com.example.team3_final_project_server.dto.ResponseDTO;
//import com.example.team3_final_project_server.dto.UserDTO;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.Duration;
//
//// 회원 가입 및 인증을 위한 서비스
//@RequiredArgsConstructor
//@Service
//public class MemberService {
//
//  private final UserMapper userMapper;
//  private final JwtTokenProvider jwtTokenProvider;
//  private final PasswordEncoder passwordEncoder;
//  private final AuthenticationManager authenticationManager;
//
//  public String signUpUser(UserDTO user){
//    if(userMapper.existsByUserId(user.getUserId())){
//      throw new IllegalArgumentException("이미 존재하는 사용자 id 입니다");
//    }
//
//    if(userMapper.existsByUserEmail(user.getUserEmail())){
//      throw new IllegalArgumentException("이미 존재하는 이메일 입니다");
//    }
//
//    String encodedPw = passwordEncoder.encode(user.getUserPass());
//
//    user.setUserPass(encodedPw);
//    user.setRole("ROLE_USER");
//
//    userMapper.save(user);
//    return "회원 가입 성공";
//  }
//
//  public ResponseDTO getJwtAuthentication(String userId, String userPass) {
//    UserDTO user = userMapper.findByUserId(userId)
//            .orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다"));
//
//    if(!passwordEncoder.matches(userPass, user.getUserPass())){
//      throw new BadCredentialsException("비밀번호가 일치하지 않습니다");
//    }
//
//    String accessToken = jwtTokenProvider.generateToken(user, Duration.ofMinutes(1));
//    return ResponseDTO.builder()
//            .accessToken(accessToken)
//            .build();
//  }
//
//  public void deleteMember(String userId) {
//    userMapper.deleteByUserId(userId);
//  }
//}