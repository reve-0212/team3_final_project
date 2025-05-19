package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.RestaurantTimeDTO;
import lombok.Data;

@Data
public class RtDTO {
  private RestaurantDTO restaurantDTO;
  private RestaurantTimeDTO restaurantTimeDTO;
}
