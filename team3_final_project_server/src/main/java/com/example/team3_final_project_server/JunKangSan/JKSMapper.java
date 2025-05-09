package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.AnnounceDTO;
import com.example.team3_final_project_server.dto.BestMenuDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JKSMapper {
    List<RestaurantDTO> getAllRestaurants();

    List<BestMenuDTO> getAllBestMenus(int resIdx);

    List<ReviewDTO> getAllReviews(int resIdx);

    AnnounceDTO getLatestAnnounce();

}
