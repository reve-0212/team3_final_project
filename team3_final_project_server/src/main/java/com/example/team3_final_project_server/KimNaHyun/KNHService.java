package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;

import java.util.List;

public interface KNHService {

    List<MenuDTO> getAllMenus(int resIdx);

    void getRsvIdx(int userIdx, int resIdx, int rsvMan, int rsvWoman, int rsvBaby, int rsvPeople) throws Exception;

    void updateRsvDate(int userIdx, int resIdx, String rsvDate, String rsvTime) throws Exception;

    void updateRsvMenu(int userIdx, int resIdx) throws Exception;
}
