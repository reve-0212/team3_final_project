package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface JKSMapper {
    List<RestaurantDTO> getAllRestaurants();

    List<BestMenuDTO> getAllBestMenus(int resIdx);

    List<ReviewDTO> getAllReviews(int resIdx);

    AnnounceDTO getLatestAnnounce();

    RestaurantDTO getRestaurantsByResIdx(int resIdx);

    AmenitiesDTO getAmenitiesByResIdx(int resIdx);

    Double getAvgRatingByResIdx(@Param("resIdx") int resIdx);

    List<Map<String, Object>> getAvgRatingByType(@Param("resIdx") int resIdx);

}
