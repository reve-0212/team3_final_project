package com.example.team3_final_project_server.KimSangMin.mapper;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import com.example.team3_final_project_server.dto.TimeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PreMapper {

    void saveSeats(List<SeatDTO> seats);


    void insertTime(TimeDTO time);

    int updateRest(int resIdx, RestaurantDTO rest);

    RestaurantDTO getRest(int resIdx);

    List<SeatDTO> loadSeat(String resIdx);

    int reSave(RestaurantDTO restaurant);

    RestaurantDTO getRestByUserIdx(int userIdx);

    Integer findResIdx(int userIdx);

    int updateSeats(List<SeatDTO> seats);

    int deleteSeat(Integer seatId, Integer resIdx);
}
