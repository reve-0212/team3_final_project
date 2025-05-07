package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JKSMapper {
    List<RestaurantDTO> getAllRestaurants();

}
