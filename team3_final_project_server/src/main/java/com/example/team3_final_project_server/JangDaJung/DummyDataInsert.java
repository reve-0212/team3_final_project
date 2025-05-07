package com.example.team3_final_project_server.JangDaJung;

import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class DummyDataInsert {

    @Autowired
    private JDJMapper jdjMapper;

    public void insertDummyData() {
        List<ReservationHistoryDTO> historyList = new ArrayList<>();
        // 1개의 예약 기록 생성
        ReservationHistoryDTO history = new ReservationHistoryDTO();
        history.setRestaurantIdx(1);
        history.setReservationIdx(100);
        history.setReservationDate(LocalDateTime.now());
        history.setMaleCount(2);
        history.setFemaleCount(1);
        history.setGenderTotalCount(3);
        history.setReservationTeamCount(1);

        // 메뉴 리스트 생성
        List<ReservationHistoryDTO.Menu> menus = new ArrayList<>();

        // 첫 번째 메뉴
        ReservationHistoryDTO.Menu menu1 = new ReservationHistoryDTO.Menu();
        menu1.setMenuIdx(10);
        menu1.setMenuName("불고기 피자");
        menu1.setMenuPrice(15000);
        menu1.setMenuSoldCount(2);
        menu1.setMenuSoldTotalPrice(30000);
        menus.add(menu1);

        // 두 번째 메뉴
        ReservationHistoryDTO.Menu menu2 = new ReservationHistoryDTO.Menu();
        menu2.setMenuIdx(11);
        menu2.setMenuName("고구마 피자");
        menu2.setMenuPrice(17000);
        menu2.setMenuSoldCount(1);
        menu2.setMenuSoldTotalPrice(17000);
        menus.add(menu2);

        // 메뉴 리스트를 기록에 세팅
        history.setMenus(menus);

        // 리스트에 추가
        historyList.add(history);

        // DB에 INSERT 실행
        jdjMapper.insertHistories(historyList);
    }

}
