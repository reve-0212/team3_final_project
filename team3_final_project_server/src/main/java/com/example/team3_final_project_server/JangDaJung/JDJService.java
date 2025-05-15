package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationHistoryDTO;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface JDJService {

//  resIdx 불러오기
    Optional<Integer> findResIdxByUserIdx(int userIdx);
//    ---- 통계 페이지

    void saveHistories(List<ReservationHistoryDTO> historyList);
//    기간별 기록 조회
    List<ReservationHistoryDTO> getHistoryByDate(String startDate, String endDate);

//    성별
    Map<String, Object> getVisitorGender(String startDate, String endDate, int resIdx);

//    메뉴 정보 불러와서 판매량 계산
    List<Map<String,Object>> getMenuSales(String startDate, String endDate, int resIdx);

    //    시간대별 예약팀 수
    List<Map<String, Object>> getTeamCountByHour(String startDate, String endDate, int resIdx);

    //    가게 영업시간 불러오기(통계페ㅐ이지에서 쓰려고 했던거)
//    Map<String, String> getResTime(int resIdx);

//    가게 예약 시간대 불러오기(메인페이지
    List<String> getResTime(String resIdx);

//    ---- 메뉴 페이지

//    리스트 불러오기
    List<MenuDTO> getMenuList(int resIdx);

//    리스트에서 숨기기 해체
    void updateUnhidden(int menuIdx, boolean hidden);

//    리스트에서 품절 해제
    void updateUnSoldOut(int menuIdx, boolean soldOut);

//    새 메뉴 등록
    void newMenu(MenuDTO menuDTO);

    int selectMaxMenuSort(int resIdx);

//    메뉴 리스트 수정
    void updateMenuList(MenuDTO menuDTO);

    //    menuEdit 페이지에서 기본 정보 불러오기
    MenuDTO getMenuById(int menuIdx);

//    메뉴 정보 수정
    void editMenu(int menuIdx, String menuName, int menuPrice, String menuExplanation, String menuImage) throws Exception;

//    메뉴 삭제
    void deleteMenu(int menuIdx);
}
