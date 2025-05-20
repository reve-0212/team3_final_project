package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.BookmarkDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import lombok.Data;

@Data
public class RbDTO {
  private RestaurantDTO restaurantDTO;
  private BookmarkDTO bookmarkDTO;
}
