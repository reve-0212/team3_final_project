package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SelectedMenuDTO;
import lombok.Data;

@Data
public class RrsmDTO {
  private ReservationDTO reservationDTO;
  private RestaurantDTO restaurantDTO;
  private MenuDTO menuDTO;
  private SelectedMenuDTO selectedMenuDTO;
}
