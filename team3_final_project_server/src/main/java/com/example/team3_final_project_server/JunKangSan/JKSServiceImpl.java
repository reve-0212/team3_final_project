package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JKSServiceImpl implements JKSService {

  @Autowired
  private JKSMapper jksMapper;

  @Override
  public List<RestaurantDTO> getAllRestaurants() {
    return jksMapper.getAllRestaurants();
  }

  @Override
  public List<BestMenuDTO> getBestMenusByResIdx(int resIdx) {
    return jksMapper.getAllBestMenus(resIdx);
  }


  @Override
  public List<ReviewDTO> getReviewsByResIdx(int resIdx) {
    return jksMapper.getAllReviews(resIdx);
  }

  @Override
  public AnnounceDTO getLatestAnnounce() {
    return jksMapper.getLatestAnnounce();
  }

  @Override
  public RestaurantDTO getRestaurantsByResIdx(int resIdx) { return jksMapper.getRestaurantsByResIdx(resIdx); }

  @Override
  public AmenitiesDTO  getAmenitiesByResIdx(int resIdx) { return jksMapper.getAmenitiesByResIdx(resIdx); }


}
