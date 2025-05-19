package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import lombok.Data;

@Data
public class RvRsDTO {
  private ReviewDTO reviewDTO;
  private RestaurantDTO restaurantDTO;
}
