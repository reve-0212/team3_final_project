package com.example.team3_final_project_server.KimSangMin.mapper;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PreMapper {

    void saveSeats(List<SeatDTO> seats);

    void insertRes(RestaurantDTO restaurant);
}
