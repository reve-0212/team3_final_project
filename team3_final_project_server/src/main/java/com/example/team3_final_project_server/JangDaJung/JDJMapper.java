package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface JDJMapper {

//    resIdx 불러오기
    Optional<Integer> selectResIdxByUserIdx(int userIdx);

//    -----통계 페이지

//    insert
//    void insertHistory(ReservationHistoryDTO historyDto);

//    메뉴 여러개 일때 insert 여러번 할 수 있도록 list 타입
    void insertHistories(List<ReservationHistoryDTO> historyList);

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

    //    가게 영업시간 불러오기(통계 페이지에서 쓰려고 했던거
//    Map<String, String> getResTime(int resIdx);

//    가게 예약 가능 시간대 불러오기(메인페이지)
    List<String> getResTime(@Param("resIdx") String resIdx);

//    ---- 메뉴 페이지
//    메뉴 리스트
    List<MenuDTO> selectMenuList(int resIdx);

//    메뉴 리스트 페이지에서 숨기기 해제
    void updateUnhidden(@Param("menuIdx") int menuIdx, @Param("menuHidden") boolean menuHidden);

//    메뉴 리스트 페이지에서 품절 해제
    void updateUnSoldOut(@Param("menuIdx") int menuIdx, @Param("menuSoldOut") boolean menuSoldOut);

//    새 메뉴 등록
    void newMenu(MenuDTO menuDTO);

    //    메뉴 sort 값 자동으로 제일 높은 값으로 새로 생성
    int selectMaxMenuSort(int resIdx);

//    메뉴 리스트 수정
    void updateMenuList(MenuDTO menu);

//     menuEdit 페이지에서 기본 정보 불러오기
    MenuDTO getMenuById(@Param("menuIdx") int menuIdx);

//    메뉴 정보 수정
    void editMenu(MenuDTO menuDTO);

//    메뉴 삭제
    void deleteMenu(@Param("menuIdx") int menuIdx);

//    ----리뷰
//    리뷰 불러오기
    List<ReviewDTO> getReviewListByResIdx(int resIdx);

//    메인페이지 리뷰 통계
    List<ReviewDTO> getReviewChByResIdx(@Param("resIdx") int resIdx);

//    가게 이름
    Map<String, Object> getStoreInfo(@Param("resIdx") int resIdx);

//    답글 작성 수정
//    int updatePreReply(ReviewDTO dto);

}
