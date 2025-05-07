package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JDJServiceImpl implements JDJService {

  @Autowired
  private JDJMapper jdjMapper;

  @Override
  public List<ReservationHistoryDTO> getHistoryByDate(String startDate, String endDate) {
    return jdjMapper.selectHistoryByDate(startDate, endDate);
  }

//  성별
  @Override
  public Map<String, Object> getVisitorGender(String startDate, String endDate, int restaurantIdx) {
    return jdjMapper.selectVisitorGender(startDate, endDate, restaurantIdx);
  }
//  매출 총액
  @Override
  public Map<String, Object> getSalesTotalPrice(String startDate, String endDate, int restaurantIdx) {
    return jdjMapper.selectSalesTotalPrice(startDate, endDate, restaurantIdx);
  }
//  메뉴별 매출
  @Override
  public List<Map<String, Object>> getMenuTotalPrice(String startDate, String endDate, int restaurantIdx) {
    return jdjMapper.selectMenuTotalPrice(startDate, endDate, restaurantIdx);
  }
//  시간대별 예약팀 수
  @Override
  public List<Map<String, Object>> getTeamCountByHour(String startDate, String endDate, int restaurantIdx) {
    return jdjMapper.selectTeamCountByHour(startDate, endDate, restaurantIdx);
  }

}
