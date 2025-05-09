package com.example.team3_final_project_server.KimSangMin.mapper;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import com.example.team3_final_project_server.dto.TimeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PreMapper {

    void saveSeats(List<SeatDTO> seats);

    void insertRes(RestaurantDTO restaurant);

    void insertTime(TimeDTO time);

    int updateRest(int resIdx, RestaurantDTO rest);

    int getRest(int resIdx, RestaurantDTO rest);

    List<SeatDTO> loadSeat(int resIdx);
}
