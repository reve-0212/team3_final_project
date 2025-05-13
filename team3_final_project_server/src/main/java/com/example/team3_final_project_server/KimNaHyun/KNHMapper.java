package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.RestaurantListDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface KNHMapper {
    static void getRsvDate(int userIdx, int resIdx, String rsvDate, String rsvTime) {
    }

    void insertReservation(ReservationDTO dto);

    void updateRsvDateTime(ReservationDTO dto);

    List<MenuDTO> getAllMenus(int resIdx);

//    List<ReservationDTO> getRsvIdx(String userIdx, String reservationIdx, int rsvMan, int rsvWoman, int rsvBaby, int rsvPeople) throws Exception;

    void getRsvIdx(int userIdx, int resIdx, int rsvMan, int rsvWoman, int rsvBaby, int rsvPeople) throws Exception;

    void updateRsvDate(int userIdx, int resIdx, String rsvDate, String rsvTime) throws Exception;

    void updateRsvMenu(int userIdx, int resIdx) throws Exception;

}
