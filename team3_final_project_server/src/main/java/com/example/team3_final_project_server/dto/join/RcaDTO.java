package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.CategoryDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import lombok.Data;

@Data
public class RcaDTO {
  private RestaurantDTO restaurantDTO;
  private CategoryDTO categoryDTO;
}
