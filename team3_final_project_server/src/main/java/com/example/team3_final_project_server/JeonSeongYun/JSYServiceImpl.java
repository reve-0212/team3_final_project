//package com.example.team3_final_project_server.JeonSeongYun;
//
//import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
//import com.example.team3_final_project_server.dto.ResponseDTO;
//import com.example.team3_final_project_server.dto.RestaurantListDTO;
//import com.example.team3_final_project_server.dto.UserDTO;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//import java.util.List;
//
//@RequiredArgsConstructor
//@Service
//public class JSYServiceImpl implements JSYService {
//
//  @Autowired
//  private JSYMapper jsyMapper;
//  @Autowired
//  private JwtTokenProvider jwtTokenProvider;
//  @Autowired
//  private PasswordEncoder passwordEncoder;
//
//
//  @Override
//  public List<RestaurantListDTO> getRstListByCategory(String category) throws Exception {
//    return jsyMapper.getRstListByCategory(category);
//  }
//
//  @Override
//  public ResponseDTO getJwtOwnerLoginCheck(String ownerId, String ownerPw) {
//    UserDTO user = jsyMapper.findByOwnerId(ownerId)
//            .orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다"));
//
//    if(!passwordEncoder.matches(ownerPw, user.getUserPass())){
//      throw new BadCredentialsException("비밀번호가 일치하지 않습니다");
//    }
//
//    String accessToken = jwtTokenProvider.generateToken(user, Duration.ofMinutes(30));
//    String refreshToken = jwtTokenProvider.generateRefreshToken(user, Duration.ofDays(7));
//
//    return ResponseDTO.builder()
//            .accessToken(accessToken)
//            .refreshToken(refreshToken)
//            .userId(user.getUserId())
//            .userNick(user.getUserNick())
//            .userCall(user.getUserCall())
//            .userEmail(user.getUserEmail())
//            .role(user.getRole())
//            .build();
//  }
//
//
//
////  @Override
////  public ResponseDTO getJwtOwnerLoginCheck(String ownerId, String ownerPw){
////    UserDTO user = jsyMapper.findByOwnerId(ownerId)
////            .orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다"));
////
////    if(!passwordEncoder.matches(ownerPw, user.getUserPass())){
////      throw new BadCredentialsException("비밀번호가 일치하지 않습니다");
////    }
////
////    String accessToken = jwtTokenProvider.generateToken(user, Duration.ofMinutes(30));
////    String refreshToken = jwtTokenProvider.generateRefreshToken(user, Duration.ofDays(7));
////
////    return ResponseDTO.builder()
////            .accessToken(accessToken)
////            .refreshToken(refreshToken)
////            .userId(user.getUserId())
////            .userNick(user.getUserNick())
////            .userCall(user.getUserCall())
////            .userEmail(user.getUserEmail())
////            .role(user.getRole())
////            .build();
////
////  }
//
//}