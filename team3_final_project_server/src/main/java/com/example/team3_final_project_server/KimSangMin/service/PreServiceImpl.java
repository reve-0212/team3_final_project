package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.KimSangMin.mapper.PreMapper;
import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import com.example.team3_final_project_server.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.DoubleStream.builder;

@Service
public class PreServiceImpl implements PreService {

  @Autowired
  private PreMapper preMapper;
  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  //    좌석 정보 저장
  @Override
  @Transactional
  public boolean saveSeats(List<SeatDTO> seats) {
    try {
      if (seats == null || seats.isEmpty()) return true;

      int resIdx = seats.get(0).getResIdx();

      Integer maxResSeatId = preMapper.getResSeatNum(resIdx);
      int nextResSeatId = (maxResSeatId == null ? 0 : maxResSeatId) + 1;


//      중복 좌석 체크
      List<SeatDTO> uniqSeat = new ArrayList<>();
      for (SeatDTO seat : seats) {
        boolean exists = preMapper.checkSeatExists(seat);
        if (!exists) uniqSeat.add(seat);
      }
       for (SeatDTO seat : uniqSeat) {
         seat.setResIdx(resIdx);

         String type = seat.getType();
//         type을 가져와 type가 창문, 입구가 아닌 것들에 한해서 resSeatId++
         if(!"창문".equalsIgnoreCase(type) && !"입구".equalsIgnoreCase(type)) {
           seat.setResSeatId(nextResSeatId++);
         } else{
//           type이 창문, 입구라면 res_seat_id는 null 값
           seat.setResSeatId(null);
         }
         preMapper.saveSeat(seat);
       }
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }


  // userIdx로 resIdx 찾기
  @Override
  public Integer findResIdx(int userIdx) {
    return preMapper.findResIdx(userIdx);
  }

  //    좌석 불러오기
  @Override
  public List<SeatDTO> loadSeat(int resIdx) {
    return preMapper.loadSeat(String.valueOf(resIdx));
  }

  //    사장 정보확인
  @Override
  public ResponseDTO tokenCheck(String token) {
    // "Bearer " 제거
    String pureToken = token.replace("Bearer ", "").trim();

    Authentication authentication = jwtTokenProvider.getAuthentication(pureToken);
    UserDTO user = (UserDTO) authentication.getPrincipal();

    return ResponseDTO.builder()
            .userIdx(user.getUserIdx())
            .userId(user.getUserId())
            .userNick(user.getUserNick())
            .userCall(user.getUserCall())
            .userEmail(user.getUserEmail())
            .role(user.getRole())
            .build();
  }


  //    가게 정보 저장
  @Override
  public boolean reSave(RestaurantDTO restaurant) {
    int result = preMapper.reSave(restaurant);
    return result > 0;
  }

  //    가게 정보 불러오기
  @Override
  public RestaurantDTO getRestByUserIdx(int userIdx) {
    return preMapper.getRestByUserIdx(userIdx);
  }

  //    좌석 수정
  @Override
  public boolean updateSeats(SeatDTO seat) {
    try {
      int updateCount = preMapper.updateSeats(seat);  // 수정된 row 수
      return updateCount > 0;  // 0이면 실패
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

  //    좌석 삭제
  @Override
  public boolean deleteSeate(Integer seatId, Integer resIdx) {
    int result = preMapper.deleteSeat(seatId,resIdx);
    return result > 0;
  }

//  카테고리 생성
  @Override
  public boolean cateSave(CategoryDTO category) {
    int result = preMapper.cateSave(category);
    return result > 0;
  }


  // 가게 정보 수정하기
  @Override
  public boolean updateRest(int resIdx, RestaurantDTO storeData) {
    int result = preMapper.updateRest(resIdx,storeData);
    return result > 0;
  }

  //    가게 운영시간 저장
  @Override
  public boolean insertTime(List<TimeDTO> timeList) {
    try {
      for (TimeDTO time : timeList) {
        preMapper.insertTime(time);
      }
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

  //    가게 정보 조회
  @Override
  public RestaurantDTO getRest(int userIdx) {
    return preMapper.getRest(userIdx);
  }
}