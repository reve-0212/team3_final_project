package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface JDJMapper {
//    insert
//    void insertHistory(ReservationHistoryDTO historyDto);

//    메뉴 여러개 일때 insert 여러번 할 수 있도록 list 타입
    void insertHistories(@Param("list") List<ReservationHistoryDTO> list);

//    날짜 기간으로 조회
    List<ReservationHistoryDTO> selectHistoryByDate(
        @Param("startDate") String startDate,
        @Param("endDate") String endDate
    );

//    성별
    Map<String, Object> selectVisitorGender(String startDate, String endDate, int resIdx);

//    메뉴 정보 불러와서 판매량 계산
    List<Map<String, Object>> selectMenuSales(@Param("startDate") String startDate, @Param("endDate") String endDate, @Param("resIdx") int resIdx);

    //    시간대별 예약팀 수
    List<Map<String, Object>> selectTeamCountByHour(String startDate, String endDate, int resIdx);

////    총 매출
//    Map<String, Object> selectSalesTotalPrice(String startDate, String endDate, int resIdx);
////    매뉴별 매출
//    List<ReservationHistoryDTO> selectMenuTotalPrice(String startDate, String endDate, int resIdx);
}
