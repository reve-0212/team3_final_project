package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface JKSService {

    List<RestaurantDTO> getAllRestaurants();

//    List<BestMenuDTO> getBestMenusByResIdx(int resIdx);

    List<ReviewDTO> getReviewsByResIdx(int resIdx);

//    AnnounceDTO getLatestAnnounce();

    RestaurantDTO getRestaurantsByResIdx(int resIdx);

//    AmenitiesDTO getAmenitiesByResIdx(int resIdx);

    Double getAvgRatingByResIdx(@Param("resIdx") int resIdx);

    Map<String, Double> getAvgRatingByType(int resIdx);

}
