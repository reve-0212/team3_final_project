package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JKSServiceImpl implements JKSService {

  @Autowired
  private JKSMapper jksMapper;

  @Override
  public List<RestaurantDTO> getAllRestaurants() {
    return jksMapper.getAllRestaurants();
  }

  @Override
  public List<MenuDTO> getBestMenu(int resIdx) {
    return jksMapper.getBestMenu(resIdx);
  }

  @Override
  public RestaurantDTO getRestaurantsByResIdx(int resIdx) { return jksMapper.getRestaurantsByResIdx(resIdx); }

  @Override
  public Double getAvgRatingByResIdx(int resIdx) { return jksMapper.getAvgRatingByResIdx(resIdx); }

  @Override
  public Map<String, Double> getAvgRatingByType(int resIdx) {
    List<Map<String, Object>> rawList = jksMapper.getAvgRatingByType(resIdx);
    Map<String, Double> result = new HashMap<>();

    for (Map<String, Object> row : rawList) {
      String type = (String) row.get("review_type");
      Double avg = (Double) row.get("avg_rating");
      result.put(type, avg);
    }

    return result;
  }
  @Override
  public List<CategoryDTO> getCategoryByAddress(String categoryAddr) { return jksMapper.getCategoryByAddress(categoryAddr); }

  @Override
  public List<RestaurantListDTO> getRstListByCategory(String category) {
    return jksMapper.getRstListByCategory(category);
  }

  public List<RestaurantListDTO> getRstListByFilter(String category, String region, String sort) {
    return jksMapper.getRstListByFilter(category, region, sort);
  }

  @Override
  public RestaurantDTO getRstListByPath(int pathIdx) {
    return jksMapper.getRstListByPath(pathIdx);
  }

  @Override
  public List<ReviewDTO> getAllReviews(int resIdx) { return jksMapper.getAllReviews(resIdx); }

  @Override
  public void insertBookmark(int userIdx, int resIdx) {
    jksMapper.insertBookmark(userIdx, resIdx);
  }
  @Override
  public void deleteBookmark(int userIdx, int resIdx) {
    jksMapper.deleteBookmark(userIdx, resIdx);
  }

//  serviceimpl
  @Override
  public List<RestaurantListDTO> getBookmarkedRestaurants(int userIdx) { return jksMapper.getBookmarkedRestaurants(userIdx); }

}
