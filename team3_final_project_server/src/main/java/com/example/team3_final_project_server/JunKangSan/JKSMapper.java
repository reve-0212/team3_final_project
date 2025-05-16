package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface JKSMapper {

    List<RestaurantListDTO> getRstListByCategory(String category);

    List<RestaurantListDTO> getRstListByFilter(@Param("category") String category, @Param("region") String region, @Param("sort") String sort);

    List<RestaurantDTO> getAllRestaurants();

    List<ReviewDTO> getAllReviews(int resIdx);

    RestaurantDTO getRestaurantsByResIdx(int resIdx);

    Double getAvgRatingByResIdx(@Param("resIdx") int resIdx);

    List<Map<String, Object>> getAvgRatingByType(@Param("resIdx") int resIdx);

    List<CategoryDTO> getCategoryByAddress(String categoryAddr);

    RestaurantDTO getRstListByPath(int pathIdx);

    List<MenuDTO> getBestMenu(int resIdx);

    void insertBookmark(@Param("userIdx") int userIdx, @Param("resIdx") int resIdx);
    void deleteBookmark(@Param("userIdx") int userIdx, @Param("resIdx") int resIdx);

//    mapper
    List<RestaurantListDTO> getBookmarkedRestaurants(int userIdx);
}
