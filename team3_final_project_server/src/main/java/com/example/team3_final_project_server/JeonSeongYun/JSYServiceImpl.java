package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import com.example.team3_final_project_server.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class JSYServiceImpl implements JSYService {

  @Autowired
  private JSYMapper jsyMapper;
  @Autowired
  private JwtTokenProvider jwtTokenProvider;
  @Autowired
  private PasswordEncoder passwordEncoder;


  @Override
  public List<RestaurantListDTO> getRstListByCategory(String category) throws Exception {
    return jsyMapper.getRstListByCategory(category);
  }

  @Override
  public ResponseDTO getJwtAdminLoginCheck(String adminId, String adminPw){
    UserDTO user = jsyMapper.findByAdminId(adminId)
            .orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다"));

    if(!passwordEncoder.matches(adminPw, user.getUserPass())){
      throw new BadCredentialsException("비밀번호가 일치하지 않습니다");
    }

    String accessToken = jwtTokenProvider.generateToken(user, Duration.ofMinutes(30));
    String refreshToken = jwtTokenProvider.generateRefreshToken(user, Duration.ofDays(7));

    return ResponseDTO.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .userId(user.getUserId())
            .userNick(user.getUserNick())
            .userCall(user.getUserCall())
            .userEmail(user.getUserEmail())
            .userIdx(user.getUserIdx())
            .role(user.getRole())
            .build();
  }

  @Override
  public String SaveOwnerInfo(UserDTO user) {

    if (jsyMapper.existsByUserId(user.getUserId())) {
      throw new IllegalArgumentException("이미 존재하는 사용자 ID입니다.");
    }


    String encodedPassword = passwordEncoder.encode(user.getUserPass());

    UserDTO newUser = UserDTO.builder()
            .userId(user.getUserId())
            .userPass(encodedPassword)
            .userNick(user.getUserNick())
            .userCall(user.getUserCall())
            .userEmail(user.getUserEmail())
            .bsName(user.getBsName())
            .bsNumber(user.getBsNumber())
            .role("ROLE_OWNER")
            .build();

    jsyMapper.saveOwner(newUser);

    return "사장 정보 등록 성공";
  }

  @Override
  public List<ReservationDTO> getResList(String seatId) {
    return jsyMapper.getResList(seatId);
  }

  @Override
  public List<SeatDTO> TodayLoadSeat(String resIdx) {
      try {
        List<SeatDTO> seats = jsyMapper.TodayLoadSeat(resIdx);
        System.out.println("Loaded seats: " + seats);  // 로그 출력
        return seats;
      } catch (Exception e) {
        return null;
      }
  }

  @Override
  public Optional<Integer> findResIdxByUser(int userIdx) {
    Integer resIdx = jsyMapper.findResIdxByUser(userIdx);
    return Optional.ofNullable(resIdx);
  }
}