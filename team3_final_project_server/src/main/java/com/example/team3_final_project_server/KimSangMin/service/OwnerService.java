//package com.example.team3_final_project_server.KimSangMin.service;
//
//import com.example.team3_final_project_server.KimSangMin.mapper.OwnerMapper;
//import com.example.team3_final_project_server.SimJiHyun.mapper.UserMapper;
//import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
//import com.example.team3_final_project_server.dto.OwnerDTO;
//import com.example.team3_final_project_server.dto.ResponseDTO;
//import com.example.team3_final_project_server.dto.UserDTO;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//
//
//@RequiredArgsConstructor
//@Service
//public class OwnerService  {
//
//    @Autowired
//    private OwnerMapper ownerMapper;
//    private final JwtTokenProvider jwtTokenProvider;
//    private final PasswordEncoder passwordEncoder;
//    private final AuthenticationManager authenticationManager;
//
//
//
//    //  로그인 토큰 주기
//    public ResponseDTO getJwtAuthentication(String userId, String userPass) {
//        UserDTO user = ownerMapper.findByUserId(userId)
//                .orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다"));
//
//        if(!passwordEncoder.matches(userPass, user.getUserPass())){
//            throw new BadCredentialsException("비밀번호가 일치하지 않습니다");
//        }
//
//        String accessToken = jwtTokenProvider.generateToken(user, Duration.ofMinutes(60));
//        String refreshToken = jwtTokenProvider.generateRefreshToken(user, Duration.ofDays(7));
//
//        return ResponseDTO.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .userIdx(user.getUserIdx())
//                .userId(user.getUserId())
//                .userNick(user.getUserNick())
//                .userCall(user.getUserCall())
//                .userEmail(user.getUserEmail())
//                .role(user.getRole())
//                .bsName(user.getBsName())
//                .bsNumber(user.getBsNumber())
//                .build();
//    }
//
//    // 사장 회원가입
//    public String signupMember(UserDTO user) {
////    기존 사용자 ID 가 있는지 확인
//        if (ownerMapper.existsByUserId(user.getUserId())) {
//            throw new IllegalArgumentException("이미 존재하는 사용자 ID입니다.");
//        }
//
//
//
////    클라이언트에서 입력받은 사용자 비밀번호를 PasswordEncoder를 통해서 암호화, 스프링 시큐리티에서는 비밀번호를 반드시 암호화해서 저장해야 함
//        String encodedPassword = passwordEncoder.encode(user.getUserPass());
//
////    사용자 정보를 데이터 베이스에 저장하기 위해서 MemberEntity 타입의 객체로 생성
//        UserDTO newUser = UserDTO.builder()
//                .userId(user.getUserId())
////        암호화된 비밀번호 저장
//                .userPass(encodedPassword)
//                .userNick(user.getUserNick())
//                .userGender(user.getUserGender())
//                .userAge(user.getUserAge())
//                .userCall(user.getUserCall())
//                .userEmail(user.getUserEmail())
////        사용자 권한으로 ROLE_MEMBER 를 기본으로 사용, 다른 권한을 사용하고자 할 경우 다른 로직에서 권한 추가
//                .role("ROLE_OWNER")
//                .build();
//
////    사용자 정보를 데이터베이스에 저장
//        ownerMapper.saveUser(newUser);
//        return "회원 가입 성공";
//    }
//
//
//// 관리자가 사장님 회원가입시키기
////  @Override
////  public boolean signOwner(OwnerDTO owner) {
////    ownerMapper.saveOwner(owner);
////    return true;
////  }
//
//// 사장님 로그인
////  @Override
////  public OwnerDTO loginOwner(OwnerDTO ownerDTO) {
////    return ownerMapper.loginOwner(ownerDTO);
////  }
//
////  사장님 정보 조회
////  @Override
////  public boolean ownerInfo(OwnerDTO ownerDTO) {
////    OwnerDTO owner = ownerMapper.findOwnerId(ownerDTO);
////    return owner != null;
////  }
//
//
//// 사장님 정보 수정
////  @Override
////  public boolean updateOwner(OwnerDTO ownerDTO) {
////    int result = ownerMapper.updateOwner(ownerDTO);
////    return result > 0;
////  }
//}
