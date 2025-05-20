package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class JDJServiceImpl implements JDJService {

    @Autowired
    private JDJMapper jdjMapper;

    @Override
    public Optional<Integer> findResIdxByUserIdx(int userIdx) {
        return jdjMapper.selectResIdxByUserIdx(userIdx);
    }


//  ----- 통계 페이지

    @Override
    public void saveHistories(List<ReservationHistoryDTO> historyList) {
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

    @Override
    public List<Map<String, Object>> getTeamCountByHourMain(String startDate, String endDate, int resIdx) {
        return jdjMapper.selectTeamCountByHourMain(startDate, endDate, resIdx);
    }


//    가게 영업시간 불러오기(통계페이지)
//    @Override
//    public Map<String, String> getResTime(int resIdx) {
//        String resTime = jdjMapper.getResTime(resIdx).toString();
//
//        String[] resTimeArr = resTime.split("~");
//        String openTime = resTimeArr.length > 0 ? resTimeArr[0] : "00:00";
//        String closeTime = resTimeArr.length > 1 ? resTimeArr[1] : "23:59";
//
//        Map<String, String> result = new HashMap<>();
//        result.put("open_time", openTime);
//        result.put("close_time", closeTime);
//
//        return result;
//    }

    //    가게 예약시간대 불러오기(메인페이지)
    @Override
    public List<String> getResTime(String resIdx) {
        return jdjMapper.getResTime(resIdx);
    }
//    @Override
//    public Map<String, Object> getResTimeWithResName(String resIdx) {
//        return jdjMapper.getResTimeWithResName(resIdx);
//    }



//  ---- 메뉴 페이지

    //    메뉴 리스트
    @Override
    public List<MenuDTO> getMenuList(int resIdx) {
        return jdjMapper.selectMenuList(resIdx);
    }

    //    메뉴 리스트 페이지에서 숨기기 해제
    @Override
    public void updateUnhidden(int menuIdx, boolean hidden) {
        jdjMapper.updateUnhidden(menuIdx, hidden);
    }

    @Override
    public void updateUnSoldOut(int menuIdx, boolean soldOut) {
        jdjMapper.updateUnSoldOut(menuIdx, soldOut);
    }

    @Override
    public void newMenu(MenuDTO menuDTO) {
        // 가장 큰 menuSort 값을 찾아서 +1로 설정
        int maxMenuSort = jdjMapper.selectMaxMenuSort(menuDTO.getResIdx());
        menuDTO.setMenuSort(maxMenuSort + 1);  // 가장 큰 menuSort + 1로 설정

        jdjMapper.newMenu(menuDTO);  // 메뉴 저장
    }

    @Override
    public int selectMaxMenuSort(int resIdx) {
        return jdjMapper.selectMaxMenuSort(resIdx);
    }

    @Override
    public void updateMenuList(MenuDTO menuDTO) {
        jdjMapper.updateMenuList(menuDTO);
    }

    //    menuEdit 페이지에서 기본 정보 불러오기
    @Override
    public MenuDTO getMenuById(int menuIdx) {
        return jdjMapper.getMenuById(menuIdx);
    }

    //    메뉴 정보 수정
    @Override
    public void editMenu(int menuIdx, String menuName, int menuPrice, String menuExplanation, String menuImage) throws Exception {
        MenuDTO menuDTO = new MenuDTO();
        menuDTO.setMenuIdx(menuIdx);
        menuDTO.setMenuName(menuName);
        menuDTO.setMenuPrice(menuPrice);
        menuDTO.setMenuExplanation(menuExplanation);
        menuDTO.setMenuImage(menuImage);

        System.out.println("menuIdx in Service: " + menuIdx);
        jdjMapper.editMenu(menuDTO);
    }

    //    메뉴 삭제
    @Override
    public void deleteMenu(int menuIdx) {
        jdjMapper.deleteMenu(menuIdx);
    }

    //    ----- 리뷰
//    메인페이지에서 리뷰 통계
    @Override
    public Map<String, Object> getReviewChByResIdx(int resIdx) {
        List<ReviewDTO> reviewList = jdjMapper.getReviewChByResIdx(resIdx);

        double averageScore = 0.0;
        if (!reviewList.isEmpty()) {
            double total = reviewList.stream().mapToDouble(ReviewDTO::getReviewRating).sum();
            averageScore = (double) total / reviewList.size();
        }

        List<Map<String, Object>> reviewScoreData = new ArrayList<>();
        for (int i = 5; i >= 1; i--) {
            final double ratingValue = i;
            int count = (int) reviewList.stream()
                .filter(r -> r.getReviewRating() == ratingValue)
                .count();

            Map<String, Object> scoreMap = new HashMap<>();
            scoreMap.put("score", i);
            scoreMap.put("count", count);
            reviewScoreData.add(scoreMap);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("averageScore", averageScore);
        result.put("reviewScoreData", reviewScoreData);
        result.put("reviewList", reviewList); // 원본 리뷰도 같이 전달

        return result;
    }

    //    가게 이름
    @Override
    public Map<String, Object> getStoreInfo(int resIdx) {
        return jdjMapper.getStoreInfo(resIdx);
    }

    //    리뷰 불러오기
    @Override
    public List<ReviewDTO> getReviewListByResIdx(int resIdx) {
        return jdjMapper.getReviewListByResIdx(resIdx);
    }

//    답글 작성, 수정
//    @Override
//    public int updatePreReply(ReviewDTO dto) {
//        return jdjMapper.updatePreReply(dto);
//    }
}

