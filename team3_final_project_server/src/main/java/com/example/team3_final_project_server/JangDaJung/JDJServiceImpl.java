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

//  ----- 통계 페이지

  @Override
  @Transactional
  public void bookReservation(List<ReservationHistoryDTO> historyList) {
    jdjMapper.insertHistories(historyList);
  }

  @Override
  public List<ReservationHistoryDTO> getHistoryByDate(String startDate, String endDate) {
    return jdjMapper.selectHistoryByDate(startDate, endDate);
  }

//  성별
  @Override
  public Map<String, Object> getVisitorGender(String startDate, String endDate, int resIdx) {
    return jdjMapper.selectVisitorGender(startDate, endDate, resIdx);
  }

//  메뉴 정보 불러와서 판매량 계산
  @Override
  public List<Map<String, Object>> getMenuSales(String startDate, String endDate, int resIdx) {
    return jdjMapper.selectMenuSales(startDate, endDate, resIdx);
  }

  //  시간대별 예약팀 수
  @Override
  public List<Map<String, Object>> getTeamCountByHour(String startDate, String endDate, int resIdx) {
    return jdjMapper.selectTeamCountByHour(startDate, endDate, resIdx);
  }

//  ---- 메뉴 페이지

//  @Override
//  public void selectMenuList(int resIdx) {
//    jdjMapper.selectMenuList(resIdx);
//  }


}
