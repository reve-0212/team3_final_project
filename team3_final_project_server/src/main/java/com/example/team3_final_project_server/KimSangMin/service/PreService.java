package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import com.example.team3_final_project_server.dto.TimeDTO;

import java.util.List;

public interface PreService {

// 가게 정보 저장
    boolean reSave(RestaurantDTO restaurant);

//  가게 정보 수정하기
     boolean updateRest(int resIdx, RestaurantDTO rest);

    //    가게 정보 불러오기
    boolean getRest(int resIdx, RestaurantDTO rest);

    //    가게 운영시간 기입하기
    boolean insertTime(List<TimeDTO> timeList);

    //    좌석 저장
    boolean saveSeats(List<SeatDTO> seats);

// 좌석 불러오기
    List<SeatDTO> loadSeat(int resIdx);





}
