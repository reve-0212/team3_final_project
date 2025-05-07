package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.RestaurantListDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JSYMapper {
    List<RestaurantListDTO> getRstListByCategory(String category) throws Exception;
}
