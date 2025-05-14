package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.RestaurantListDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface KNHMapper {

    List<MenuDTO> getAllMenus(int resIdx);

    void updateRsvDate(int userIdx, int resIdx, int rsvPeople, int rsvMan, int rsvWoman, int rsvBaby,  String rsvDate, String rsvTime) throws Exception;

    void updateRsvMenu(int userIdx, int resIdx) throws Exception;

    List<ReservationDTO> getResIdx(int userIdx, int resIdx, String rsvDate, String rsvTime);

    String selectResReserveTime(@Param("resIdx") int resIdx);

    void insertReview(ReviewDTO reviewDTO);
}
