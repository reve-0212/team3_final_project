package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;

import java.util.List;

public interface KNHService {

  List<MenuDTO> getAllMenus(int resIdx);

  void updateRsvDate(int userIdx, int resIdx, int rsvPeople, int rsvMan, int rsvWoman, int rsvBaby, String rsvDate, String rsvTime) throws Exception;

  void updateRsvMenu(int userIdx, int resIdx) throws Exception;

    List<ReservationDTO> getResIdx(int userIdx, int resIdx, String rsvDate, String rsvTime);

    String getResReserveTime(int resIdx);

    void submitReview(ReviewDTO reviewDTO) throws Exception;


    List<ReviewDTO> getReviews(int userIdx) throws Exception;
}
