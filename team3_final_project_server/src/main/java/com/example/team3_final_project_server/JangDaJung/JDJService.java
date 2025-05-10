package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;

import java.util.List;
import java.util.Map;

public interface JDJService {
//    기간별 기록 조회
    List<ReservationHistoryDTO> getHistoryByDate(String startDate, String endDate);

//    성별
    Map<String, Object> getVisitorGender(String startDate, String endDate, int resIdx);

//    메뉴 정보 불러와서 판매량 계산
    List<Map<String,Object>> getMenuSales(String startDate, String endDate, int resIdx);

    //    시간대별 예약팀 수
    List<Map<String, Object>> getTeamCountByHour(String startDate, String endDate, int resIdx);

////    매출 총액
//    Map<String, Object> getSalesTotalPrice(String startDate, String endDate, int resIdx);
////    메뉴별 매출
//    List<ReservationHistoryDTO> getMenuTotalPrice(String startDate, String endDate, int resIdx);
}
