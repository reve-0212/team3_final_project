package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.AnnounceDTO;
import com.example.team3_final_project_server.dto.BestMenuDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;

import java.util.List;

public interface JKSService {

    List<RestaurantDTO> getAllRestaurants();

    List<BestMenuDTO> getBestMenusByResIdx(int resIdx);

    List<ReviewDTO> getReviewsByResIdx(int resIdx);

    AnnounceDTO getLatestAnnounce();

}
