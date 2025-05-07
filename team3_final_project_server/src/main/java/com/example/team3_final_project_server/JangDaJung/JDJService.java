package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;

import java.util.List;
import java.util.Map;

public interface JDJService {
//    기간별 기록 조회
    List<ReservationHistoryDTO> getHistoryByDate(String startDate, String endDate);

//    성별
    Map<String, Object> getVisitorGender(String startDate, String endDate, int restaurantIdx);
//    매출 총액
    Map<String, Object> getSalesTotalPrice(String startDate, String endDate, int restaurantIdx);
//    메뉴별 매출
    List<Map<String, Object>> getMenuTotalPrice(String startDate, String endDate, int restaurantIdx);
//    시간대별 예약팀 수
    List<Map<String, Object>> getTeamCountByHour(String startDate, String endDate, int restaurantIdx);

}
