//package com.example.team3_final_project_server.JangDaJung;
//
//import com.example.team3_final_project_server.dto.ReservationHistoryDTO;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.LocalTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Random;
//
//@Component
//@RequiredArgsConstructor
//public class DummyDataInsert {
//
//    private final JDJMapper historyMapper;
//    private final Random random = new Random();
//
//    public void insertDummyData() {
//        List<ReservationHistoryDTO> flatList = new ArrayList<>();
//
//        // ✅ 최근 5일 (2025-05-03 ~ 2025-05-07)
//        LocalDate startDate = LocalDate.of(2025, 5, 3);
//
//        for (int i = 0; i < 5; i++) {
//            // 예약 공통 데이터
//            int reservationIdx = 100 + i;
//            int resIdx = 1;
//            LocalDate date = startDate.plusDays(i);
//            LocalTime time = LocalTime.of(11 + random.nextInt(10), 0); // 11:00 ~ 20:00
//            LocalDateTime reservationDate = LocalDateTime.of(date, time);
//
//            int maleCount = random.nextInt(3); // 0~2명
//            int femaleCount = random.nextInt(3); // 0~2명
//            int genderTotalCount = maleCount + femaleCount;
//            int reservationTeamCount = 1;
//
//            // ✅ 메뉴 더미 데이터 (2~3개 랜덤)
//            int menuCount = 2 + random.nextInt(2); // 2 or 3개 메뉴
//            for (int j = 0; j < menuCount; j++) {
//                ReservationHistoryDTO history = new ReservationHistoryDTO();
//                history.setResIdx(resIdx);
//                history.setReservationIdx(reservationIdx);
//                history.setReservationDate(reservationDate);
//                history.setMaleCount(maleCount);
//                history.setFemaleCount(femaleCount);
//                history.setGenderTotalCount(genderTotalCount);
//                history.setReservationTeamCount(reservationTeamCount);
//
//                // ✅ 메뉴 데이터
//                int menuIdx = j + 1;
//                String menuName = "메뉴" + menuIdx;
//                int menuPrice = 10000 + j * 5000;
//                int menuSoldCount = 1 + random.nextInt(3); // 1~3개
//                int menuSoldTotalPrice = menuPrice * menuSoldCount;
//
//                history.setMenuIdx(menuIdx);
//                history.setMenuName(menuName);
//                history.setMenuPrice(menuPrice);
//                history.setMenuSoldCount(menuSoldCount);
//                history.setMenuSoldTotalPrice(menuSoldTotalPrice);
//
//                flatList.add(history);
//            }
//        }
//
//        // ✅ 이 flatList로 insert 실행
//        historyMapper.insertHistories(flatList);
//    }
//}
