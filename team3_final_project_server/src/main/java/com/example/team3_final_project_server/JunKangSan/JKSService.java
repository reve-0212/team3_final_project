package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.*;

import java.util.List;

public interface JKSService {

    List<RestaurantDTO> getAllRestaurants();

    List<BestMenuDTO> getBestMenusByResIdx(int resIdx);

    List<ReviewDTO> getReviewsByResIdx(int resIdx);

    AnnounceDTO getLatestAnnounce();

    RestaurantDTO getRestaurantsByResIdx(int resIdx);

    AmenitiesDTO getAmenitiesByResIdx(int resIdx);

}
