package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JDJServiceImpl implements JDJService {

    @Autowired
    private JDJMapper jdjMapper;

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
}
