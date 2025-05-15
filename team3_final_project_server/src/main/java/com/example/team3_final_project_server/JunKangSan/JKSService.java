package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface JKSService {

    List<RestaurantDTO> getAllRestaurants();

    List<ReviewDTO> getAllReviews(int resIdx);

    RestaurantDTO getRestaurantsByResIdx(int resIdx);

    Double getAvgRatingByResIdx(@Param("resIdx") int resIdx);

    Map<String, Double> getAvgRatingByType(int resIdx);

    List<CategoryDTO> getCategoryByAddress(String categoryAddr);

    List<RestaurantListDTO> getRstListByCategory(String category);

    RestaurantDTO getRstListByPath(int pathIdx);

    List<MenuDTO> getBestMenu(int resIdx);
}
